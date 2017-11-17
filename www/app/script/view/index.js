/**
 * Created by alone on 17-5-12.
 */
'use strict';
import Common from '../common';
export default {
    data () {
        return {
            active: 0,
            spanLeft: 5,
            spanRight: 19,
            contentHeight: 200,
            menus: [{
                id: 0,
                name: '我的主页',
                icon: 'fa-home',
                path: '/home',
                show: false,
                closeable: false
            }, {
                id: 1,
                icon: 'ios-navigate',
                name: '账户管理',
                path: '/account'
            }]
        }
    },
    async mounted() {
        window.onresize = this.calcHeight;
        this.$nextTick(() => this.calcHeight());
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        toggleClick() {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },
        calcHeight() {
            let height = Common.getWindowHeight();
            this.contentHeight = height - 60 - 48 - 33;
        },
        selectedMenu(selected) {
            let menu = this.findMenu(this.menus, selected);
            let matched = menu.path ? this.$router.getMatchedComponents(menu.path): [];
            if (!matched.length) {
                alert('未实现' + menu.path);
                return;
            }
            this.$router.push(menu.path);
            this.active = selected;
        },
        findMenu(menus, id) {
            for (let menu of menus) {
                if (menu.id === id) {return menu}
                if (menu.sub && menu.sub.length) {
                    let m = this.findMenu(menu.sub, id);
                    if (m) return m;
                }
            }
        }
    }
}