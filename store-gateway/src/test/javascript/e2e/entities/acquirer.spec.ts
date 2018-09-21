import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Acquirer e2e test', () => {

    let navBarPage: NavBarPage;
    let acquirerDialogPage: AcquirerDialogPage;
    let acquirerComponentsPage: AcquirerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Acquirers', () => {
        navBarPage.goToEntity('acquirer');
        acquirerComponentsPage = new AcquirerComponentsPage();
        expect(acquirerComponentsPage.getTitle())
            .toMatch(/storeApp.acquirer.home.title/);

    });

    it('should load create Acquirer dialog', () => {
        acquirerComponentsPage.clickOnCreateButton();
        acquirerDialogPage = new AcquirerDialogPage();
        expect(acquirerDialogPage.getModalTitle())
            .toMatch(/storeApp.acquirer.home.createOrEditLabel/);
        acquirerDialogPage.close();
    });

    it('should create and save Acquirers', () => {
        acquirerComponentsPage.clickOnCreateButton();
        acquirerDialogPage.setNameInput('name');
        expect(acquirerDialogPage.getNameInput()).toMatch('name');
        acquirerDialogPage.setAddressInput('address');
        expect(acquirerDialogPage.getAddressInput()).toMatch('address');
        acquirerDialogPage.networkSelectLastOption();
        acquirerDialogPage.save();
        expect(acquirerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AcquirerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-acquirer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AcquirerDialogPage {
    modalTitle = element(by.css('h4#myAcquirerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    networkSelect = element(by.css('select#field_network'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    networkSelectLastOption = function() {
        this.networkSelect.all(by.tagName('option')).last().click();
    };

    networkSelectOption = function(option) {
        this.networkSelect.sendKeys(option);
    };

    getNetworkSelect = function() {
        return this.networkSelect;
    };

    getNetworkSelectedOption = function() {
        return this.networkSelect.element(by.css('option:checked')).getText();
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
