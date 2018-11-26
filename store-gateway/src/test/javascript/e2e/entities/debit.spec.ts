import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Debit e2e test', () => {

    let navBarPage: NavBarPage;
    let debitDialogPage: DebitDialogPage;
    let debitComponentsPage: DebitComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Debits', () => {
        navBarPage.goToEntity('debit');
        debitComponentsPage = new DebitComponentsPage();
        expect(debitComponentsPage.getTitle())
            .toMatch(/storeApp.debit.home.title/);

    });

    it('should load create Debit dialog', () => {
        debitComponentsPage.clickOnCreateButton();
        debitDialogPage = new DebitDialogPage();
        expect(debitDialogPage.getModalTitle())
            .toMatch(/storeApp.debit.home.createOrEditLabel/);
        debitDialogPage.close();
    });

    it('should create and save Debits', () => {
        debitComponentsPage.clickOnCreateButton();
        debitDialogPage.setPinInput('5');
        expect(debitDialogPage.getPinInput()).toMatch('5');
        debitDialogPage.setCardNumberInput('5');
        expect(debitDialogPage.getCardNumberInput()).toMatch('5');
        debitDialogPage.setValidityDateInput(12310020012301);
        expect(debitDialogPage.getValidityDateInput()).toMatch('2001-12-31T02:30');
        debitDialogPage.setCustomeridInput('5');
        expect(debitDialogPage.getCustomeridInput()).toMatch('5');
        debitDialogPage.issuingBankSelectLastOption();
        debitDialogPage.save();
        expect(debitDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DebitComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-debit div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DebitDialogPage {
    modalTitle = element(by.css('h4#myDebitLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    pinInput = element(by.css('input#field_pin'));
    cardNumberInput = element(by.css('input#field_cardNumber'));
    validityDateInput = element(by.css('input#field_validityDate'));
    customeridInput = element(by.css('input#field_customerid'));
    issuingBankSelect = element(by.css('select#field_issuingBank'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPinInput = function(pin) {
        this.pinInput.sendKeys(pin);
    };

    getPinInput = function() {
        return this.pinInput.getAttribute('value');
    };

    setCardNumberInput = function(cardNumber) {
        this.cardNumberInput.sendKeys(cardNumber);
    };

    getCardNumberInput = function() {
        return this.cardNumberInput.getAttribute('value');
    };

    setValidityDateInput = function(validityDate) {
        this.validityDateInput.sendKeys(validityDate);
    };

    getValidityDateInput = function() {
        return this.validityDateInput.getAttribute('value');
    };

    setCustomeridInput = function(customerid) {
        this.customeridInput.sendKeys(customerid);
    };

    getCustomeridInput = function() {
        return this.customeridInput.getAttribute('value');
    };

    issuingBankSelectLastOption = function() {
        this.issuingBankSelect.all(by.tagName('option')).last().click();
    };

    issuingBankSelectOption = function(option) {
        this.issuingBankSelect.sendKeys(option);
    };

    getIssuingBankSelect = function() {
        return this.issuingBankSelect;
    };

    getIssuingBankSelectedOption = function() {
        return this.issuingBankSelect.element(by.css('option:checked')).getText();
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
