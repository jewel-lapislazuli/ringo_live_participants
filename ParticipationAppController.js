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
    var param = e.parameter;
    var formInputData = new FormInputData(trimTwitterUserNamePrefix(param.twitterUserName), param.userName, param.dateIndex);
    var result = 0;
    var type = getFormType(param.formType);

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

function registData(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    var param = e.parameter;
    var pInfo = new ParticipationInfo_(trimTwitterUserNamePrefix(param.twitterUserName), param.userName, param.dateIndex);
    var result = null;

    confirmDialog.hide();

    result = registParticipationInfo(pInfo);

    if(result == 0){
        showCompleteMessageDialog(app, TYPE_REGIST)
    } else {
        showErrorMessageDialog(app, result);
    }

    app.close();
    return app;
}

function deleteData(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    var param = e.parameter;
    var pInfo = new ParticipationInfo_(trimTwitterUserNamePrefix(param.twitterUserName), param.userName, param.dateIndex);
    var result = null;

    confirmDialog.hide();

    result = deleteParticipationInfo(pInfo);

    if(result == 0){
        showCompleteMessageDialog(app, TYPE_DELETE);
    } else {
        showErrorMessageDialog(app, result);
    }

    app.close();
    return app;
}

function showCompleteMessageDialog(app, type){
    var completeMessageDialog = createCompleteMessageDialog(app, type);

    completeMessageDialog.show();

    return 0;
}

function closeConfirmDialog(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = getConfirmDialog(app);

    confirmDialog.hide();

    app.close();
    return app;
}

function closeCompleteMessageDialog(e){
    var app = UiApp.getActiveApplication();
    var completeMessageDialog = getCompleteMessageDialog(app);

    completeMessageDialog.hide();

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
