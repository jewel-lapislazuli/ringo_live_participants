function doGet(e){
    var app = buildUiApp();
    return app;
}

function registSelected(e){
    var app = UiApp.getActiveApplication();

    var userNameLabel = getUserNameLabel(app);
    var userNameTextBox = getUserNameTextBox(app);
    var userNameSampleLabel = getUserNameSampleLabel(app);

    userNameLabel.setVisible(true);
    userNameTextBox.setVisible(true);
    userNameSampleLabel.setVisible(true);

    app.close();
    return app;
}

function deleteSelected(e){
    var app = UiApp.getActiveApplication();

    var userNameLabel = getUserNameLabel(app);
    var userNameTextBox = getUserNameTextBox(app);
    var userNameSampleLabel = getUserNameSampleLabel(app);

    userNameLabel.setVisible(false);
    userNameTextBox.setVisible(false);
    userNameSampleLabel.setVisible(false);

    app.close();
    return app;
}

function confirmInputData(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = createConfirmDialog(app);
    var formInputData = new FormInputData(e.parameter.twitterUserName, e.parameter.userName, e.parameter.dateIndex);
    var result = 0;
    var type = 0;

    if(e.parameter.formType == "false"){
        type = TYPE_REGIST;
        result = formInputData.validateDataOnRegist();
    } else {
        type = TYPE_DELETE;
        result = formInputData.validateDataOnDelete();
    }

    confirmDialog.show();

    app.close();
    return app;
}

function submitData(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    confirmDialog.hide();

    app.close();
    return app;
}

function closeConfirmDialog(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    confirmDialog.hide();

    app.close();
    return app;
}
