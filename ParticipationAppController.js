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
    var formInputData = new FormInputData(e.parameter.twitterUserName, e.parameter.userName, e.parameter.dateIndex);
    var result = 0;
    var type = getFormType(e.parameter.formType);

    if(type == TYPE_REGIST){
        result = formInputData.validateDataOnRegist();
    } else {
        result = formInputData.validateDataOnDelete();
    }

    if(result != 0){
        showErrorMessageDialog(app, result);
    } else {
        confirmSubmitData(app, formInputData, type);
    }

    app.close();
    return app;
}

function confirmSubmitData(app, formInputData, type){
    var confirmDialog = createConfirmDialog(app, type);

    confirmDialog.show();

    return 0;
}

function showErrorMessageDialog(app, errorCode){
    var errorMessageDialog = createErrorMessageDialog(app, getErrorMessage(errorCode));

    errorMessageDialog.show();

    return 0;
}

function registParticipationInfo(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    confirmDialog.hide();

    app.close();
    return app;
}

function deleteParticipationInfo(e){
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

function closeErrorMessageDialog(e){
    var app = UiApp.getActiveApplication();
    var errorMessageDialog = getErrorMessageDialog(app);

    errorMessageDialog.hide();

    app.close();
    return app;
}
