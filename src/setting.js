// setting.js

function setup(){
    const settings = {
        siteTitle: "ទស្សនាវដ្តី​យើង",
        description: "",
        date: (new Date()).toLocaleDateString('it-IT'),
        adminItems: 10,
        indexPosts: 20,
        categoryPosts: 20,
        pageTitle: "Home",
        username: "",
        message: "",
        count: 0,
    }

    return settings
}

export default setup