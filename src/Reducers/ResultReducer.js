export default function ResutReducer(currentResult, action) {
    switch (action.type) {
        case "changeTheme": {
            let theDLTheme = !action.payload;
            localStorage.setItem(
                "LightAndDarkTheme",
                JSON.stringify(theDLTheme)
            );
            return theDLTheme;
        }
        case "getTheme": {
            let storage =
                JSON.parse(localStorage.getItem("LightAndDarkTheme")) ?? [];
            return storage;
        }
        default: {
            return currentResult;
        }
    }
}
