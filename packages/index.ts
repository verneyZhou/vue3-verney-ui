
import Waterfall from "./waterfall";

const components = [
    Waterfall
]

const install = (app: any) => {
    components.forEach((component: any) => {
        app.component(component.name, component)
    })
}

export {
    Waterfall
}

export default {
    install
}

// module.exports = {
//     install,
//     Waterfall
// };
// module.exports.default = module.exports;