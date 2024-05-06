<template>
  <div>
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
            <a-button html-type="submit" type="primary"> 留言 </a-button>
          </a-form-item>
        </template>
      </a-comment></div
    >

    <div>
      <a-comment v-for="item in items" :key="item.id">
        <template #actions>
          <span key="comment-nested-reply-to" @click="replay">回复</span>
          <!-- <span
            key="comment-nested-reply-to"
            v-if="item.userName === user.username"
            @click="deletebyId(item.id)"
            >删除</span
          > -->
        </template>
        <template #author>
          <a>{{ item.userName }}</a>
        </template>
        <template #avatar>
          <a-avatar :src="item.img" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            {{ item.content }}
          </p>
        </template>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
            <span key="comment-nested-reply-to">删除</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </template>
          <a-comment>
            <template #actions>
              <span>Reply to</span>
              <span key="comment-nested-reply-to">删除</span>
            </template>
            <template #author>
              <a>Han Solo</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            </template>
            <template #content>
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
              </p>
            </template>
          </a-comment>
        </a-comment>
      </a-comment></div
    >
    <Message @register="register" />
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
  const imageUrl = ref(getinfo.getUserInfo.userPic);
  const user = ref(getinfo.getUserInfo);
  const [register, { openModal }] = useModal();
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
    console.log(`output->user`, user);
  });
  async function handleSubmit() {
    console.log(`output->valueData`, valueData);
    await add(valueData);
  }
  function replay() {
    openModal(true);
  }
  async function deletebyId(id) {
    try {
      await deleteById(id);
      createMessage.success('删除成功');
    } catch (error) {
      createMessage.error('删除失败');
    }
    console.log(`output->id`, id);
  }
</script>
<style></style>
