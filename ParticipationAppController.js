function doGet(e){
    var app = buildUiApp();
    return app;
}

function registSelected(e){
    var app = UiApp.getActiveApplication();

    var userNameLabel = app.getElementById('userNameLabel');
    var userNameTextBox = app.getElementById('userNameTextBox');
    var userNameSampleLabel = app.getElementById('userNameSampleLabel');

    userNameLabel.setVisible(true);
    userNameTextBox.setVisible(true);
    userNameSampleLabel.setVisible(true);

    app.close();
    return app;
}

function deleteSelected(e){
    var app = UiApp.getActiveApplication();

    var userNameLabel = app.getElementById('userNameLabel');
    var userNameTextBox = app.getElementById('userNameTextBox');
    var userNameSampleLabel = app.getElementById('userNameSampleLabel');

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
    var dialog = app.getElementById('confirmDialog');

    dialog.hide();

    app.close();
    return app;
}

function closeConfirmDialog(e){
    var app = UiApp.getActiveApplication();
    var dialog = app.getElementById('confirmDialog');

    dialog.hide();

    app.close();
    return app;
}
