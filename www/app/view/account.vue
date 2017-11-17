<template>
    <div>
        <Card :bordered="false" dis-hover>
            <p slot="title">
                <Icon type="mouse"></Icon>
                邮箱账户信息
                <span @click="showAdd"><Button type="primary" icon="search">添加</Button></span>
            </p>
            <Row>
                <Input v-model="search.query.email" placeholder="请输入邮箱地址搜搜..." style="width: 150px" />
                <Input v-model="search.query.name" placeholder="请输入邮箱名称搜搜..." style="width: 150px" />
                <Select v-model="search.query.type" style="width:100px">
                    <Option value="">全部</Option>
                    <Option v-for="item in MailerType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select v-model="search.query.status" style="width:90px">
                    <Option value="">全部</Option>
                    <Option v-for="item in MailerStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <span @click="doQuery" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
            </Row>
            <Row style="margin-top: 10px">
                <Table :columns="table.columns" :data="table.data"></Table>
            </Row>
        </Card>
        <Modal v-model="model" title="新增账户" :loading="loadingBtn" @on-ok="add" @on-cancel="cancelLoading">
            <Form ref="form" :model="vo" :label-width="100" :rules="accountValidate">
                <Form-item label="邮箱地址" prop="email">
                    <Input v-model="vo.email"/>
                </Form-item>
                <Form-item label="邮箱密码" prop="password">
                    <Input v-model="vo.password" type="password"/>
                </Form-item>
                <Form-item label="类型" prop="type">
                    <Select v-model="vo.type">
                        <Option v-for="item in MailerType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="SMTP" prop="smtp" v-show="vo.type === 'empty'">
                    <Input v-model="vo.smtp"/>
                </Form-item>
                <Form-item label="PORT" prop="port" v-show="vo.type === 'empty'">
                    <Input-number v-model="vo.port" :min="1" :max="65565"></Input-number>
                </Form-item>
                <Form-item label="名称" prop="name">
                    <Input v-model="vo.name"/>
                </Form-item>
                <Form-item label="状态" prop="status">
                    <Select v-model="vo.status">
                        <Option v-for="item in MailerStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import view from '../script/view/account';
    export default view;
</script>