import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashDeskApplication e2e test', () => {

    let navBarPage: NavBarPage;
    let cashDeskApplicationDialogPage: CashDeskApplicationDialogPage;
    let cashDeskApplicationComponentsPage: CashDeskApplicationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashDeskApplications', () => {
        navBarPage.goToEntity('cash-desk-application');
        cashDeskApplicationComponentsPage = new CashDeskApplicationComponentsPage();
        expect(cashDeskApplicationComponentsPage.getTitle())
            .toMatch(/storeApp.cashDeskApplication.home.title/);

    });

    it('should load create CashDeskApplication dialog', () => {
        cashDeskApplicationComponentsPage.clickOnCreateButton();
        cashDeskApplicationDialogPage = new CashDeskApplicationDialogPage();
        expect(cashDeskApplicationDialogPage.getModalTitle())
            .toMatch(/storeApp.cashDeskApplication.home.createOrEditLabel/);
        cashDeskApplicationDialogPage.close();
    });

    it('should create and save CashDeskApplications', () => {
        cashDeskApplicationComponentsPage.clickOnCreateButton();
        cashDeskApplicationDialogPage.setInventoryidInput('5');
        expect(cashDeskApplicationDialogPage.getInventoryidInput()).toMatch('5');
        cashDeskApplicationDialogPage.save();
        expect(cashDeskApplicationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashDeskApplicationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-desk-application div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashDeskApplicationDialogPage {
    modalTitle = element(by.css('h4#myCashDeskApplicationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    inventoryidInput = element(by.css('input#field_inventoryid'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setInventoryidInput = function(inventoryid) {
        this.inventoryidInput.sendKeys(inventoryid);
    };

    getInventoryidInput = function() {
        return this.inventoryidInput.getAttribute('value');
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
