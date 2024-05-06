<template>
  <div class="message">
    <a-affix :offset-top="top" class="content">
      <div>
        <a-comment>
          <template #avatar>
            <a-avatar :src="imageUrl" alt="Han Solo" />
          </template>
          <template #content>
            <a-form-item>
              <a-textarea v-model:value="valueData.content" :rows="4" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" type="primary" @click="handleSubmit"> 留言 </a-button>
            </a-form-item>
          </template>
        </a-comment>
      </div></a-affix
    >
    <div class="list">
      <a-comment v-for="item in items" :key="item.id" class="lists">
        <template #actions>
          <span key="comment-nested-reply-to" @click="replay(item.id)">回复</span>
          <span
            key="comment-nested-reply-to"
            v-if="item.userName === user.username"
            @click="deletebyId(item.id)"
            >删除</span
          >
        </template>
        <template #author>
          <a style="color: red; font-size: larger">{{ item.userName }}</a>
        </template>
        <template #avatar>
          <a-avatar :src="item.img" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            {{ item.content }}
          </p>
        </template>
        <a-comment v-for="it in item.cmessage" :key="it.id">
          <template #actions>
            <span @click="replay(it.id)">回复</span>
            <span
              key="comment-nested-reply-to"
              v-if="it.userName === user.username"
              @click="deletebyId(it.id)"
              >删除</span
            >
          </template>
          <template #author>
            <a>{{ it.userName }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="it.img" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              {{ it.content }}
            </p>
          </template>
          <a-comment v-for="i in it.cmessage" :key="i.id">
            <template #actions>
              <span>回复</span>
              <span
                key="comment-nested-reply-to"
                v-if="i.userName === user.username"
                @click="deletebyId(i.id)"
                >删除</span
              >
            </template>
            <template #author>
              <a>{{ i.userName }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="i.img" alt="Han Solo" />
            </template>
            <template #content>
              <p>
                {{ i.content }}
              </p>
            </template>
          </a-comment>
        </a-comment>
      </a-comment>
    </div>
    <Message @register="register" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { add, list, deleteById } from '@/api/sys/message';
  import { useUserStore } from '@/store/modules/user';
  import Message from './messageModel.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const getinfo = useUserStore();
  const items: any = ref([]);
  const message: any = ref([]);
  const imageUrl = ref(getinfo.getUserInfo.userPic);
  const user = ref(getinfo.getUserInfo);
  const [register, { openModal }] = useModal();
  const containerRef = ref();
  const top = ref<number>(10);
  interface FormState {
    content: string;
  }
  const valueData: UnwrapRef<FormState> = reactive({
    content: '',
  });
  onMounted(async () => {
    const data = await list();
    console.log(`output->111111`, data);
    items.value = data;
    // message.value = data.cmessage;
    console.log(`output->cmessage.value`, data);
  });
  async function handleSubmit() {
    console.log(`output->valueData`, valueData);
    await add(valueData);
    createMessage.success('留言成功');
    reload();
    valueData.content = '';
  }
  function replay(id) {
    console.log(`output->`, id);
    openModal(true, { parentid: id });
  }
  async function deletebyId(id) {
    try {
      await deleteById(id);
      createMessage.success('删除成功');
    } catch (error) {
      createMessage.error('删除失败');
    }
    console.log(`output->id`, id);
    reload();
  }
  async function reload() {
    const data = await list();
    console.log(`output->111111`, data);
    items.value = data;
  }
  function handleSuccess() {
    reload();
  }
</script>
<style lang="less" scoped>
  .message {
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 99%;
    // height: 100vh;
    margin: 16px;
    border-radius: 10px;
    background-attachment: fixed;
    background-color: #fff;
    background-image: url('@/assets/images/333.webp');
    background-size: contain;

    .content {
      width: 50%;
      margin-top: 20px;
      opacity: 1; /* 这里设置透明度为50% */
      // background-color: #f3ecec;
    }

    .list {
      width: 50%;
      opacity: 0.9; /* 这里设置透明度为50% */
      // height: 65vh;
      // background-color: #eee;

      .lists {
        margin-left: 20px;
      }
    }
  }
</style>
