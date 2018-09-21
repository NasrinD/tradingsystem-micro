import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashDesk e2e test', () => {

    let navBarPage: NavBarPage;
    let cashDeskDialogPage: CashDeskDialogPage;
    let cashDeskComponentsPage: CashDeskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashDesks', () => {
        navBarPage.goToEntity('cash-desk');
        cashDeskComponentsPage = new CashDeskComponentsPage();
        expect(cashDeskComponentsPage.getTitle())
            .toMatch(/storeApp.cashDesk.home.title/);

    });

    it('should load create CashDesk dialog', () => {
        cashDeskComponentsPage.clickOnCreateButton();
        cashDeskDialogPage = new CashDeskDialogPage();
        expect(cashDeskDialogPage.getModalTitle())
            .toMatch(/storeApp.cashDesk.home.createOrEditLabel/);
        cashDeskDialogPage.close();
    });

    it('should create and save CashDesks', () => {
        cashDeskComponentsPage.clickOnCreateButton();
        cashDeskDialogPage.setCardReaderidInput('5');
        expect(cashDeskDialogPage.getCardReaderidInput()).toMatch('5');
        cashDeskDialogPage.printerSelectLastOption();
        cashDeskDialogPage.cashBoxSelectLastOption();
        cashDeskDialogPage.cashDeskGuiSelectLastOption();
        cashDeskDialogPage.barCodeScannerSelectLastOption();
        cashDeskDialogPage.cashDeskApplicationSelectLastOption();
        cashDeskDialogPage.save();
        expect(cashDeskDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashDeskComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-desk div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashDeskDialogPage {
    modalTitle = element(by.css('h4#myCashDeskLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cardReaderidInput = element(by.css('input#field_cardReaderid'));
    printerSelect = element(by.css('select#field_printer'));
    cashBoxSelect = element(by.css('select#field_cashBox'));
    cashDeskGuiSelect = element(by.css('select#field_cashDeskGui'));
    barCodeScannerSelect = element(by.css('select#field_barCodeScanner'));
    cashDeskApplicationSelect = element(by.css('select#field_cashDeskApplication'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCardReaderidInput = function(cardReaderid) {
        this.cardReaderidInput.sendKeys(cardReaderid);
    };

    getCardReaderidInput = function() {
        return this.cardReaderidInput.getAttribute('value');
    };

    printerSelectLastOption = function() {
        this.printerSelect.all(by.tagName('option')).last().click();
    };

    printerSelectOption = function(option) {
        this.printerSelect.sendKeys(option);
    };

    getPrinterSelect = function() {
        return this.printerSelect;
    };

    getPrinterSelectedOption = function() {
        return this.printerSelect.element(by.css('option:checked')).getText();
    };

    cashBoxSelectLastOption = function() {
        this.cashBoxSelect.all(by.tagName('option')).last().click();
    };

    cashBoxSelectOption = function(option) {
        this.cashBoxSelect.sendKeys(option);
    };

    getCashBoxSelect = function() {
        return this.cashBoxSelect;
    };

    getCashBoxSelectedOption = function() {
        return this.cashBoxSelect.element(by.css('option:checked')).getText();
    };

    cashDeskGuiSelectLastOption = function() {
        this.cashDeskGuiSelect.all(by.tagName('option')).last().click();
    };

    cashDeskGuiSelectOption = function(option) {
        this.cashDeskGuiSelect.sendKeys(option);
    };

    getCashDeskGuiSelect = function() {
        return this.cashDeskGuiSelect;
    };

    getCashDeskGuiSelectedOption = function() {
        return this.cashDeskGuiSelect.element(by.css('option:checked')).getText();
    };

    barCodeScannerSelectLastOption = function() {
        this.barCodeScannerSelect.all(by.tagName('option')).last().click();
    };

    barCodeScannerSelectOption = function(option) {
        this.barCodeScannerSelect.sendKeys(option);
    };

    getBarCodeScannerSelect = function() {
        return this.barCodeScannerSelect;
    };

    getBarCodeScannerSelectedOption = function() {
        return this.barCodeScannerSelect.element(by.css('option:checked')).getText();
    };

    cashDeskApplicationSelectLastOption = function() {
        this.cashDeskApplicationSelect.all(by.tagName('option')).last().click();
    };

    cashDeskApplicationSelectOption = function(option) {
        this.cashDeskApplicationSelect.sendKeys(option);
    };

    getCashDeskApplicationSelect = function() {
        return this.cashDeskApplicationSelect;
    };

    getCashDeskApplicationSelectedOption = function() {
        return this.cashDeskApplicationSelect.element(by.css('option:checked')).getText();
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
