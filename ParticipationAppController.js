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
