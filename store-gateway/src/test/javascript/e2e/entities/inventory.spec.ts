import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Inventory e2e test', () => {

    let navBarPage: NavBarPage;
    let inventoryDialogPage: InventoryDialogPage;
    let inventoryComponentsPage: InventoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Inventories', () => {
        navBarPage.goToEntity('inventory');
        inventoryComponentsPage = new InventoryComponentsPage();
        expect(inventoryComponentsPage.getTitle())
            .toMatch(/storeApp.inventory.home.title/);

    });

    it('should load create Inventory dialog', () => {
        inventoryComponentsPage.clickOnCreateButton();
        inventoryDialogPage = new InventoryDialogPage();
        expect(inventoryDialogPage.getModalTitle())
            .toMatch(/storeApp.inventory.home.createOrEditLabel/);
        inventoryDialogPage.close();
    });

    it('should create and save Inventories', () => {
        inventoryComponentsPage.clickOnCreateButton();
        inventoryDialogPage.setStoreidInput('5');
        expect(inventoryDialogPage.getStoreidInput()).toMatch('5');
        inventoryDialogPage.setCashDeskApplicationidInput('5');
        expect(inventoryDialogPage.getCashDeskApplicationidInput()).toMatch('5');
        inventoryDialogPage.save();
        expect(inventoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InventoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-inventory div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InventoryDialogPage {
    modalTitle = element(by.css('h4#myInventoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    storeidInput = element(by.css('input#field_storeid'));
    cashDeskApplicationidInput = element(by.css('input#field_cashDeskApplicationid'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStoreidInput = function(storeid) {
        this.storeidInput.sendKeys(storeid);
    };

    getStoreidInput = function() {
        return this.storeidInput.getAttribute('value');
    };

    setCashDeskApplicationidInput = function(cashDeskApplicationid) {
        this.cashDeskApplicationidInput.sendKeys(cashDeskApplicationid);
    };

    getCashDeskApplicationidInput = function() {
        return this.cashDeskApplicationidInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}