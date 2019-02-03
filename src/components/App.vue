<template>
  <div>
    <p :title="message">{{ message }}, vue</p>
    <button @click="countUp">count: {{ count }}</button>
    <span v-if="count % 2 === 0">偶数</span>
    <span v-else>奇数</span>
    <span v-show="count % 3 === 0">・3の倍数</span>
    <ul>
      <!-- <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li> -->
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </ul>
    <p>
      <input v-model="input" placeholder="記入してください">
      <span>input: {{ input }}</span>
    </p>
    <select v-model="selected">
      <option value disabled>選択してください</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>選択肢: {{ selected }}</span>
    <div>
      <input type="checkbox" id="red" value="赤" v-model="checked">
      <label for="red">赤</label>
      <input type="checkbox" id="green" value="緑" v-model="checked">
      <label for="green">緑</label>
      <input type="checkbox" id="blue" value="青" v-model="checked">
      <label for="blue">青</label>
      <span>チェック済み: {{ checked }}</span>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  data: () => ({
    message: "hello",
    count: 0,
    todos: [{ id: 0, text: "todo 0", done: true }],
    input: "",
    selected: "",
    checked: []
  }),
  methods: {
    countUp(e) {
      console.log(e);
      this.count++;
      this.todos.push({
        id: this.count,
        text: `todo ${this.count}`,
        done: this.count % 3 === 0
      });
    }
  },
  components: { TodoItem },
  mounted() {
    console.log("mounted");
  }
};
</script>