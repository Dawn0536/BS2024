<template>
  <div class="personal">
    <div class="header">
      <div class="avatar">
        <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
          <template #icon>
            <!-- <AntDesignOutlined /> -->
            <img :src="imageUrl" alt="" />
          </template>
        </a-avatar> </div
      ><div class="nikename" v-if="info"
        >您好 !<span style="margin-left: 10px">{{ getinfomation.nikeName }} </span>
        <div class="remake">个人描述： {{ getinfomation.remake }}</div>
      </div>
    </div>
    <div class="left">
      <div class="center">个人中心</div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="vertical"
        :items="items"
        :dashed="true"
        @click="handleClick"
        class="menu"
      />
    </div>
    <div class="right">
      <div v-if="selectedItem === 'basic'" class="container">
        <div class="myself">个人信息</div>
        <div class="basicinfo"
          ><BasicForm @register="registerForm" />
          <div class="button">
            <a-button @click="resetFields1"> 重置 </a-button>
            <a-button class="!ml-4" type="primary" @click="handleSubmit1"> 确认 </a-button></div
          >
        </div>
      </div>
      <div v-else-if="selectedItem === 'updatepassword'" class="password">
        <PageWrapper
          title="修改当前用户密码"
          content="修改成功后会自动退出当前登录！"
          class="password"
        >
          <div class="py-8 bg-white flex flex-col justify-center items-center">
            <BasicForm @register="register" />
            <div class="flex justify-center">
              <a-button @click="resetFields"> 重置 </a-button>
              <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
            </div>
          </div>
        </PageWrapper></div
      >
      <div v-else-if="selectedItem === 'updateavatar'">
        <div
          style="
            margin-top: 10px;
            margin-left: 10px;
            font-family: serif;
            font-size: 30px;
            font-weight: bold;
          "
          >修改头像</div
        >
        <div class="avatar-container">
          <el-upload
            class="avatar-uploader"
            ref="uploadRef"
            :show-file-list="false"
            :auto-upload="true"
            name="file"
            action="/upload"
            :headers="{ Authorization: getinfo.getToken }"
            :on-success="uploadSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 40%; height: 40%" />
            <img v-else src="../../../assets/images/avatar.jpg" width="278" />
          </el-upload>
          <br />
          <div class="imgbutton"
            ><el-button
              type="primary"
              size="large"
              @click="uploadRef.$el.querySelector('input').click()"
            >
              选择图片
            </el-button>
            <el-button type="success" size="large" @click="updateAvatar1">
              上传头像
            </el-button></div
          ></div
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { CalendarOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { ref, h, onMounted, nextTick, watchEffect } from 'vue';
  import type { MenuProps } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { ElMessage } from 'element-plus';
  import { BasicForm, useForm } from '@/components/Form';
  import { updatePassword, getUserInfo1 } from '@/api/sys/login';
  import { formSchema } from '../../demo/system/password/pwd.data';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';
  import { updateAvatar, updateuser } from '@/api/sys/user';
  import { getFormSchema } from './home.data.tsx';

  const getinfo = useUserStore();
  const info = ref(false);
  const uploadRef = ref();
  const getinfomation = ref();
  defineOptions({ name: 'ChangePassword' });
  const router = useRouter();
  const imageUrl = ref(getinfo.getUserInfo.userPic);
  const selectedItem = ref(''); // 添加ref变量来存储选中的菜单项的键值
  const selectedKeys = ref(['basic']);
  const openKeys = ref([]);
  const items = ref([
    {
      key: 'basic',
      icon: () => h(UserOutlined),
      label: '基本信息',
      title: '基本信息',
    },
    {
      key: 'updatepassword',
      icon: () => h(CalendarOutlined),
      label: '修改密码',
      title: '修改密码',
    },
    {
      key: 'updateavatar',
      icon: () => h(CalendarOutlined),
      label: '修改头像',
      title: '修改头像',
    },
  ]);
  const { createMessage } = useMessage();
  const [registerForm, { validate: validate1, setFieldsValue, resetFields: resetFields1 }] =
    useForm({
      size: 'large',
      baseColProps: { span: 24 },
      labelWidth: 100,
      showActionButtonGroup: false,
      // resetFunc: async () => {
      //   await setFieldsValue({
      //     username: getinfo.getUserInfo.username,
      //   });
      //   console.log(`output->`,name)
      // },
      schemas: getFormSchema(),
    });
  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });
  const uploadSuccess = (result) => {
    console.log(`output->`, result);
    imageUrl.value = result.data;
  };
  async function handleSubmit1() {
    const value = await validate1();
    const id = getinfo.getUserInfo.id;
    console.log(`output->id`, id);
    console.log(`output->`, value);

    try {
      await updateuser(id, value);
      console.log(`output->`, getinfo.getUserInfo);
      const getuserinfo = await getUserInfo1();
      console.log(`output->getuserinfo1111`, getuserinfo);
      setFieldsValue(getuserinfo);
      getinfomation.value = getuserinfo;
      ElMessage.success('修改成功');
    } catch (error) {
      ElMessage.error('修改失败');
    }
  }
  async function updateAvatar1() {
    // console.log(`output->imageUrl.value`, imageUrl.value);
    await updateAvatar(imageUrl.value);
    ElMessage.success('修改成功');
    getinfo.getUserInfo.userPic = imageUrl.value;
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      const { old_pwd, new_pwd, re_pwd } = values;

      // TODO custom api
      console.log(old_pwd, new_pwd, re_pwd);
      await updatePassword(values);
      createMessage.success('密码修改成功,请重新登录');
      router.push(PageEnum.BASE_LOGIN);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick: MenuProps['onClick'] = (menuInfo) => {
    console.log('click ', menuInfo);
    selectedItem.value = menuInfo.key; // 更新selectedItem的值为选中菜单项的键值
    if (menuInfo.key === 'basic') {
      // 替换为您要检查的特定键值
      // 执行特定的操作
      setTimeout(async () => {
        const getuserinfo = await getUserInfo1();
        setFieldsValue(getuserinfo);
      }, 0);
    }
  };
  onMounted(async () => {
    console.log(`output->`, getinfo);
    const getuserinfo = await getUserInfo1();
    console.log(`output->getuserinfo`, getuserinfo);
    console.log(`output-> getinfomation.value`, getinfomation.value);
    await nextTick(); // 等待下一个 tick，确保菜单已经渲染完成
    const firstItem = items.value[0];
    handleClick({ key: firstItem.key });
    watchEffect(() => {
      if (getinfo.getUserInfo) {
        // 确保数据加载完成后再执行操作
        setFieldsValue(getinfo.getUserInfo);
        setTimeout(() => {
          setFieldsValue(getinfo.getUserInfo);
          getinfomation.value = getinfo.getUserInfo;
          console.log(`output->111111`, getinfomation.value);
          info.value = true;
        }, 0);
      }
    });
  });
</script>
<style lang="less" scoped>
  .personal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    padding: 16px;
    transform: translate(-50%, -50%);
    // background-color: #fff;
    .header {
      display: flex;
      align-items: center;
      // justify-content: center;
      width: 100%;
      height: 20%;
      border-radius: 20px; /* 设置圆角半径 */
      // background-image: url('../../../assets/images/OIP-C.jpg'); /* 渐变背景 */
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      background-size: cover; /* 或者 contain */
      // background: linear-gradient(220.55deg, #7CF7FF 0%, #4B73FF 100%);
      .avatar {
        // margin-bottom: 30px;
        padding: 1%;
      }

      .nikename {
        // margin-top: -2%;
        font-size: 20px; /* 设置字体大小，根据需要调整 */
        .remake {
          margin-top: 50px;
        }
      }

      .nikename > span {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .left {
      position: absolute;
      top: 24%;
      left: 0;
      width: calc(30% - 30px); /* 减去间隔的宽度 */
      height: 70%;
      margin-right: 8px; /* 设置间隔 */
      margin-left: 16px;
      border-radius: 20px; /* 设置圆角半径 */
      // background-image: url('../../../assets/images/R-C (3).jpg');
      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

      .center {
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        width: 100%;
        height: 20%;
        border-bottom: 1px dashed #ccc; /* 虚线样式 */
        background: linear-gradient(to right, red, blue); /* 设置文字颜色渐变 */
        background-clip: text; /* 添加前缀以支持某些旧版本的浏览器 */
        -webkit-text-fill-color: transparent; /* 设置文字填充颜色为透明，使渐变背景显示在文字上 */
        font-family: 'Microsoft YaHei', sans-serif; /* 使用微软雅黑字体 */
        font-size: 30px;
        font-weight: bold;
      }

      .menu {
        // display: flex;
        // align-items: center; /* 垂直居中 */
        // justify-content: center; /* 水平居中 */
        width: 100%;
        margin-top: 2%;
        // background-image: url('../../../assets/images/R-C (3).jpg');
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        // height: 100%; /* 填充父容器高度 */
        text-align: center;
      }
    }

    .right {
      position: absolute;
      top: 24%;
      left: calc(30% + 8px); /* 左侧位置考虑了间隔的宽度 */
      width: calc(70% - 25px); /* 剩余空间的宽度减去间隔的宽度 */
      height: 70%;
      margin-right: 16px; /* 设置间隔 */
      border-radius: 20px; /* 设置圆角半径 */
      background-color: #fff;
      // background-image: url('../../../assets/images/R-C (3).jpg');

      .password {
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
        background-color: #fff; /* 设置其他背景颜色 */
        // background-image: url('../../../assets/images/R-C (3).jpg');\
        background-image: none; /* 不继承父级背景图片 */
      }

      .container {
        display: flex;
        position: relative;
        flex-direction: column; /* 设置主轴为垂直方向 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        width: 100%;
        height: 100%;
        // background-image: url('../../../assets/images/R-C (3).jpg');

        .myself {
          position: absolute;
          top: 10px;
          left: 10px;
          // background-image: url('../../../assets/images/R-C (3).jpg');
          font-family: serif;
          font-size: 30px;
          font-weight: bold;
        }

        /* 或者您可以使用具有固定高度的父容器 */
        .basicinfo {
          width: 50%;
          padding: 20px; /* 添加一些内边距以增加内容的空间 */
          // background-color: #fff;
          // background-image: url('../../../assets/images/R-C (3).jpg');

          .button {
            display: flex;
            justify-content: center; /* 将按钮置于中间 */
          }
        }
      }

      .avatar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10%;
      }

      .bottom-center-button {
        // margin-top: auto; /* 将按钮推到容器的底部 */
      }
    }
  }

  .avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    width: 178px;
    height: 178px;
    color: #8c939d;
    font-size: 28px;
    text-align: center;
  }
</style>
