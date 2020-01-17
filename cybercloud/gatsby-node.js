const path = require('path');
const fs = require('fs');

const sortObject = (packages) => {
    const sortable = [];

    for (const myPackage in packages) {
        sortable.push([myPackage, packages[myPackage]])
    }

    sortable.sort((a, b) => {
        return b[1] - a[1]
    });

    const obj = {};
    sortable.forEach((item) => {
        obj[item[0]] = item[1];
    })

    return obj;
}

exports.createPages = async({ actions }) => {
    const { createPage } = actions;

    const profiles = [];
    const usernames = fs.readdirSync(path.join(__dirname, './src/profiles'));
    usernames.forEach((username) => {
        const unparsed = fs.readFileSync(path.join(__dirname, `./src/profiles/${ username}`));
        const profile = JSON.parse(unparsed);
        // profile.languages = JSON.stringify(profile.languages);
        // profile.packages = JSON.stringify(profile.packages);      
        // profile.devPackages = JSON.stringify(profile.devPackages);
        profiles.push(profile);
        createPage({
            path: `/profile/${ profile.login }`,
            component: require.resolve("./src/templates/profile.js"),
            context: { profile }
        })
    })
    // return profiles;
    console.log(profiles);
    createPage({
        path: `/profiles`,
        component: require.resolve("./src/templates/profiles.js"),
        context: { profiles }
    })
}