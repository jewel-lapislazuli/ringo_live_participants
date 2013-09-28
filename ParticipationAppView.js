function buildUiApp(){
    var app = UiApp.createApplication();

    var formPanel = createFormPanel(app);

    app.add(formPanel);

    return app;
}

function createFormPanel(app){
    var formPanel = app.createVerticalPanel();
    var formTypePanel = createFormTypePanel(app);
    var formGrid = createFormGrid(app);
    var submitButton = createSubmitButton(app);

    formPanel.setSpacing(10);
    formPanel.add(formTypePanel);
    formPanel.add(formGrid);
    formPanel.add(submitButton);

    return formPanel;
}

function createFormTypePanel(app){
    var panel = app.createHorizontalPanel();
    var registRadio = app.createRadioButton('formType', '登録する').setId('registForm');
    var deleteRadio = app.createRadioButton('formType', '削除する').setId('deleteForm');

    var registSelected = app.createServerHandler('registSelected');
    var deleteSelected = app.createServerHandler('deleteSelected');

    registRadio.addClickHandler(registSelected);
    deleteRadio.addClickHandler(deleteSelected);

    panel.add(registRadio);
    panel.add(deleteRadio);

    return panel;
}

function createFormGrid(app){
    var grid = app.createGrid(3, 3);

    grid.setWidget(0, 0, app.createLabel('参戦日'));
    grid.setWidget(0, 1, createLiveDateListBox(app));

    grid.setWidget(1, 0, app.createLabel('Twitterユーザ名    @'));
    grid.setWidget(1, 1, app.createTextBox().setName('twitterUserName').setId('twitterUserName'));
    grid.setWidget(1, 2, app.createLabel('例: @jwl_lapislazuli'));

    grid.setWidget(2, 0, app.createLabel('名前'));
    grid.setWidget(2, 1, app.createTextBox().setName('userName').setId('userName'));
    grid.setWidget(2, 2, app.createLabel('例: ラピスラズリ'));

    return grid;
}

function createLiveDateListBox(app){
    var listBox = app.createListBox().setName('liveDateListBox').setId('liveDateListBox');

    listBox.setVisibleItemCount(1);

    listBox.addItem('', -1);
    for(var key in LIVE_DATEINFO){
        listBox.addItem(key, LIVE_DATEINFO[key]);
    }

    return listBox;
}

function createSubmitButton(app){
    var submitButton = app.createButton('送信');
    var submitHandler = app.createServerHandler('confirmInputData');

    submitButton.addClickHandler(submitHandler);

    return submitButton;
}

function createConfirmDialog(app){
    var confirmDialog = app.createDialogBox(false, true).setTitle('確認');
    var confirmPanel = createConfirmPanel(app);

    confirmDialog.setPopupPosition(400, 50);
    confirmDialog.add(confirmPanel);
    confirmDialog.setId('confirmDialog');

    return confirmDialog;
}

function createConfirmButtonPanel(app){
    var buttonPanel = app.createHorizontalPanel();

    var okButton = app.createButton('はい').setId('confirmOK');
    var cancelButton = app.createButton('いいえ').setId('confirmCancel');

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

function createConfirmPanel(app){
    var confirmPanel = app.createVerticalPanel();

    var label = app.createLabel('このデータでよいですか？');
    var buttonPanel = createConfirmButtonPanel(app);

    label.setWidth('200px');
    label.setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER);

    confirmPanel.add(label);
    confirmPanel.add(buttonPanel);

    return confirmPanel;
}
