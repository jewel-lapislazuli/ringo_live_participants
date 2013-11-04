function buildUiApp(){
    var app = UiApp.createApplication();

    var formPanel = createFormPanel(app);
    var submitButton = createSubmitButton(app);

    app.add(formPanel);
    app.add(submitButton);

    return app;
}

function createFormPanel(app){
    var formPanel = app.createVerticalPanel().setId('formPanel');
    var formTypePanel = createFormTypePanel(app);
    var formGrid = createFormGrid(app);

    formPanel.setSpacing(10);
    formPanel.add(formTypePanel);
    formPanel.add(formGrid);

    return formPanel;
}

function createFormTypePanel(app){
    var panel = app.createHorizontalPanel();
    var registRadio = app.createRadioButton('formType', '登録する').setName('formType').setId('registRadio').setValue(true);
    var deleteRadio = app.createRadioButton('formType', '削除する').setName('formType').setId('deleteRadio');

    var registSelected = app.createServerHandler('registSelected');
    var deleteSelected = app.createServerHandler('deleteSelected');

    registRadio.addClickHandler(registSelected);
    deleteRadio.addClickHandler(deleteSelected);

    panel.add(registRadio);
    panel.add(deleteRadio);

    return panel;
}

function createFormGrid(app){
    var grid = app.createGrid(3, 3).setId('formGrid');

    var dateIndexLabel = app.createLabel('参戦日').setId('dateIndexLabel');
    var dateIndexListBox = createLiveDateListBox(app).setName('dateIndex').setId('dateIndexListBox');

    var twitterUserNameLabel = app.createLabel('Twitterユーザ名').setId('twitterUserNameLabel');
    var twitterUserNameTextBox = app.createTextBox().setName('twitterUserName').setId('twitterUserNameTextBox');
    var twitterUserNameSampleLabel = app.createLabel('例: @jwl_lapislazuli').setId('twitterUserNameSampleLabel');
    twitterUserNameTextBox.setText('@');

    var userNameLabel = app.createLabel('名前').setId('userNameLabel');
    var userNameTextBox = app.createTextBox().setName('userName').setId('userNameTextBox');
    var userNameSampleLabel = app.createLabel('例: ラピスラズリ').setId('userNameSampleLabel');

    grid.setWidget(0, 0, dateIndexLabel);
    grid.setWidget(0, 1, dateIndexListBox);

    grid.setWidget(1, 0, twitterUserNameLabel);
    grid.setWidget(1, 1, twitterUserNameTextBox);
    grid.setWidget(1, 2, twitterUserNameSampleLabel);

    grid.setWidget(2, 0, userNameLabel);
    grid.setWidget(2, 1, userNameTextBox);
    grid.setWidget(2, 2, userNameSampleLabel);

    return grid;
}

function createLiveDateListBox(app){
    var listBox = app.createListBox().setName('liveDateListBox').setId('liveDateListBox');

    listBox.setVisibleItemCount(1);

    listBox.addItem('', DATEINDEX_DEFAULT_VALUE);
    for(var key in LIVE_DATEINFO){
        listBox.addItem(key, LIVE_DATEINFO[key]);
    }

    return listBox;
}

function createSubmitButton(app){
    var submitButton = app.createButton('送信');
    var submitHandler = app.createServerHandler('confirmInputData');
    var callbackWidget = getFormPanel(app);

    submitHandler.addCallbackElement(callbackWidget);
    submitButton.addClickHandler(submitHandler);

    return submitButton;
}

function createConfirmDialog(app, type){
    var confirmDialog = app.createDialogBox(false, true).setTitle('確認');
    var confirmPanel = createConfirmPanel(app, type);

    confirmDialog.setPopupPosition(50, 50);
    confirmDialog.add(confirmPanel);
    confirmDialog.setId('confirmDialog');

    return confirmDialog;
}

function createErrorMessageDialog(app, message){
    var errorMessageDialog = app.createDialogBox(false, true).setTitle('エラー');
    var errorMessagePanel = createErrorMessagePanel(app, message);

    errorMessageDialog.setPopupPosition(50, 50);
    errorMessageDialog.add(errorMessagePanel);
    errorMessageDialog.setId('errorMessageDialog');

    return errorMessageDialog;
}

function createConfirmPanel(app, type){
    var confirmPanel = app.createVerticalPanel();

    var label = app.createLabel();
    var buttonPanel = createConfirmButtonPanel(app, type);

    if(type == TYPE_REGIST){
        label.setText('登録しますか？');
    } else {
        label.setText('削除しますか？');
    }
    label.setWidth('200px');
    label.setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER);

    confirmPanel.add(label);
    confirmPanel.add(buttonPanel);

    return confirmPanel;
}

function createConfirmButtonPanel(app, type){
    var buttonPanel = app.createHorizontalPanel();

    var okButton = app.createButton('OK').setId('confirmOK');
    var cancelButton = app.createButton('キャンセル').setId('confirmCancel');

    var confirmOkHandler = app.createServerHandler('submitData');
    var confirmCancelHandler = app.createServerHandler('closeConfirmDialog');

    buttonPanel.setWidth('200px');
    buttonPanel.setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER);

    okButton.addClickHandler(confirmOkHandler);
    cancelButton.addClickHandler(confirmCancelHandler);

    buttonPanel.add(okButton);
    buttonPanel.add(cancelButton);

    return buttonPanel;
}

function createErrorMessagePanel(app, message){
    var errorMessagePanel = app.createVerticalPanel();

    var label = app.createLabel(message);
    var closeButton = app.createButton('閉じる').setId('closeButton');

    var closeButtonHandler = app.createServerHandler('closeErrorMessageDialog');
    closeButton.addClickHandler(closeButtonHandler);

    errorMessagePanel.setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER);
    errorMessagePanel.add(label);
    errorMessagePanel.add(closeButton);

    return errorMessagePanel
}

function getFormType(formTypeRadioStatus){
    if(formTypeRadioStatus == "false"){
        return TYPE_REGIST;
    } else {
        return TYPE_DELETE;
    }
}

function getUserNameLabel(app){
    return app.getElementById('userNameLabel');
}

function getUserNameTextBox(app){
    return app.getElementById('userNameTextBox');
}

function getUserNameSampleLabel(app){
    return app.getElementById('userNameSampleLabel');
}

function getConfirmDialog(app){
    return app.getElementById('confirmDialog');
}

function getFormPanel(app){
    return app.getElementById('formPanel');
}

function getFormGrid(app){
    return app.getElementById('formGrid');
}

function getErrorMessageDialog(app){
    return app.getElementById('errorMessageDialog');
}
