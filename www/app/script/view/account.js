/**
 * Created by alone on 17-6-29.
 */
'use strict';
import Common from "../common";
import {getAttribute, MailerType, MailerStatus} from "../dic";
import {ipcRenderer} from 'electron';
export default {
    data() {
        return {
            search: {
                page: 1,
                pageSize: 10,
                sortName: 'created_at',
                sortDir: 'desc',
                query: {
                    type: '',
                    email: '',
                    name: '',
                    status: ''
                }
            },
            MailerType,
            MailerStatus,
            loadingBtn: false,
            selectItem: null,
            pauseMsg: null,
            cancelMsg: null,
            table: {
                columns: [{
                    title: '邮箱地址',
                    key: 'email',
                    ellipsis: true,
                    render: Common.RENDER.POPTIP
                }, {
                    title: '类型',
                    key: 'type',
                    render: (h, params) => {
                        return h('span', getAttribute(MailerType, 'id', params.row.type).name);
                    }
                }, {
                    title: '名称',
                    key: 'name'
                }, {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h('span', getAttribute(MailerStatus, 'id', params.row.status).name);
                    }
                }],
                data: [],
                total: 0
            },
            model: true,
            cancelModal: false,
            pauseModal: false,
            vo: {
                email: null,
                password: null,
                type: null,
                status: 1,
                name: null,
                smtp: null,
                port: 1
            },
            accountValidate: {
                email: [{required: true, trigger: 'blur', type: 'email' }],
                password: [{required: true, trigger: 'blur'}],
                type: [{required: true, trigger: 'change' }],
                status: [{required: true, trigger: 'change' , type: 'number'}],
                smtp: [{required: true, trigger: 'blur'}],
                port: [{required: true, trigger: 'blur', type: 'number'}]
            }
        }
    },
    async mounted() {
        //await this.doQuery();
    },
    components: {
    },
    watch: {
        'vo.email'(newVal, oldVal) {
            this.$refs['form'].validateField('email', valid => {
                if (!valid) {
                    let mailer = this.queryEmail(newVal);
                    this.vo.type = mailer ? mailer.id : 'empty';
                    ipcRenderer.send('verifyMailer', {
                        host: 'smtp.aliyun.com',
                        port: 25,
                        secure: false, // upgrade later with STARTTLS
                        auth: {
                            user: 'berrybao1992@aliyun.com',
                            pass: 'woaini1992523'
                        }
                    });
                }
            });
        },
        'vo.type'(type) {
            this.accountValidate.smtp[0].required = type === 'empty';
            this.accountValidate.port[0].required = type === 'empty';
        }
    },
    methods: {
        queryEmail(email) {
            let domain = email.split('@').pop().toLowerCase();
            for (let item of MailerType) {
                if (Array.isArray(item.domains)) {
                    if (item.domains.includes(domain)) return item;
                }
            }
            return false;
        },
        async add() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    let date = this.$refs['triggerTime'].currentValue;
                    let success = await this.fetch('/job/add', {method: 'post', data: Object.assign({
                        triggerTime: date ? date.getTime() : null
                    }, this.vo)});
                    if (success === false) {
                        this.resetLoadingBtn();
                        return;
                    }
                    this.model = false;
                    setTimeout(() => this.doQuery(), 500);
                } else {
                    this.resetLoadingBtn();
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        async cancel() {
            if (!this.selectItem || !this.cancelMsg) return;
            let success = await this.fetch('/job/cancel', {method: 'post', data: {taskId: this.selectItem.task_id, msg: this.cancelMsg}});
            if (success === false) {
                this.resetLoadingBtn();
                return;
            }
            this.selectItem = null;
            this.cancelModal = false;
            setTimeout(() => this.doQuery(), 500);
        },
        async recovery() {
            if (!this.selectItem) return;
            let success = await this.fetch('/job/recovery', {method: 'post', data: {taskId: this.selectItem.task_id, msg: '恢复暂停'}});
            if (success === false) {
                this.resetLoadingBtn();
                return;
            }
            this.selectItem = null;
            setTimeout(() => this.doQuery(), 500);
        },
        async doQuery() {
            let date = this.$refs['date'].currentValue;
            this.search.query.start_time = date[0] instanceof Date ? Common.dateFormat(date[0]) : '';
            this.search.query.end_time = date[1] instanceof Date ? Common.dateFormat(date[1]) : '';
            Common.voNumberToChar(this.search.query);
            let list = await this.fetch('/job/list/page', {params: this.search});
            list && (this.table.data = list.page.count === 0 ? [] : list.page.items);
            list && (this.table.total = list.page.count);
            this.loadingBtn = false;
        },
        async changePage(page) {
            this.search.page = page;
            this.doQuery();
        },
        async changePageSize(size) {
            this.search.pageSize = size;
            this.doQuery();
        },
        showAdd() {
            this.model = true;
            this.loadingBtn = true;
            this.$refs['form'].resetFields();
        },
        cancelLoading() {
            this.loadingBtn = false;
        },
        resetLoadingBtn() {
            this.loadingBtn = false;
            this.$nextTick(() => this.loadingBtn = true);
        },
        canPause(data) {
            if (['FAILED','CANCEL','SUCCESS'].includes(data.status)) return true;
            return !(data.status === 'CREATE' || data.type === 'CRON' || (['REAL_TIME','TIMER','REPEAT'].includes(data.type) && (data.retry_times < data.max_retry_times || data.repeated_count < data.repeat_count)));
        }
    }
}