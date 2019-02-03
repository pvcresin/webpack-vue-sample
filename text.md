<!-- $theme: gaia -->

Vue.js 入門

---

# 概要

## やること

- Vue の基本的な書き方を大まかに学び，Vue の雰囲気を掴む

## やらないこと

- CSS などのスタイリング
- 開発環境の設定
  - webpack
  - webpack-dev-server
  - Hot Module Replacement

## 使うもの

- Google Chrome
- VSCode (Visual Studio Code)
- Node v8.0+
- Yarn

---

# 講師紹介

![](https://pbs.twimg.com/profile_images/978185881042366464/A3nlKNpz_400x400.jpg)

プロフィール

- Y 本さんの一声で React から Vue に転生することに!?
- Vue 歴 1 日
- マジでわからねぇ

---

# ちなみに

- 公式のガイド掻い摘んだだけだよ
  - https://jp.vuejs.org/v2/guide/
- どうせ Laravel（+ Laravel Mix）といずれ連携すると思うので，Laravel で Vue 動かすまでの記事は書いといたよ
  - http://pvcresin.hatenablog.com/entry/2019/02/03/

---

# 準備

- Chrome 拡張の Vue.js devtools 入れる
  - https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=ja
  - ファイルへのアクセス許可も忘れずに
- VSCode の設定で 保存時の自動フォーマットをオンに
  - `formatOnSave: true`
- VSCode 拡張の以下 2 つを入れる

  - Prettier: いろんな形式のファイルを自動フォーマットする君
    - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  - Vetur: Vue ファイルをいい感じに表示したりする君
    - https://marketplace.visualstudio.com/items?itemName=octref.vetur

- 元となるプロジェクトをクローン
  - `git clone https://github.com/pvcresin/webpack-vue-sample.git`
  - `master`は完成形がおいてあるので，ブランチを`handson`に切り替える
  - `yarn`して依存モジュールを入れる

---

# メニュー

- Vue.js とは
- Vue を動かす
  - webpack-dev-server
  - Hot Module Replacement
- data を表示する
- v-bind
- イベント
- ライフサイクル
- if, else, show, for
- 子コンポーネントを作成する
  - props
- フォームのデータを取得する
  - v-model
  - input
  - select
  - checkbox

---

# Vue.js とは

- コンポーネントによる View の構築
- HTML, CSS, JS の基本構文と少しの特殊構文
- サイズが小さい（React より小さく，preact より大きいぐらい）
- 日本語ドキュメントが充実
- 仮想 DOM
  - JS オブジェクトの差分比較により最小限の DOM 操作で画面更新する技術

---

# Vue を動かす

## 今回使う技術

- babel: `.vue` ファイルを JS に変換
- webpack: 複数のファイルを一つの JS にまとめる
- webpack-dev-server: 開発用ビルトインサーバ
- Hot Module Replacement: ブラウザをリロードせずにコードを更新

## コマンド

`package.json`の`scripts`を見ると，

- `prod`: 1 回`production`ビルド
- `dev`: 1 回`development`ビルド
- `watch`: ファイルが更新されるたびに`development`ビルド（ブラウザリロード必要）
- `hot`: HMR．ファイルが更新されるたびに dev ビルド（ブラウザリロード不要）

## フォルダ構成

- `dist/`
  - `index.html`
- `src/`
  - `app.js`
  - `components/`
    - `App.vue`
- `webpack.config.js`

## `.vue`ファイルの構成

`App.vue`

```html
<template>
  <div>
    <p>vue</p>
  </div>
</template>

<script>
export default {};
</script>
```

- template に HTML タグなどの View
- script に JS
- （style に CSS を書くことも）

## `yarn watch`

- `src/`内のファイルをまとめて，`dist/`に`app.js`に出力され，`index.html`をブラウザで開くと "Hello Vue" と表示されている
- `App.vue`を変更すると，自動でビルドされ，ブラウザをリロードすると変更されている

## `yarn hot`

- `localhost:8080`を開き，`App.vue`を変更すると，画面の変更箇所が更新される（リロードなし）
- ちなみに JS ファイルは`dist/`に出力されない

---

# data を表示する

```html
<template>
  <div>
    <p>{{ message }}, vue</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: "hello"
    };
  }
};
</script>
```
- `data`はオブジェクトを返す関数
- 下のようにも書ける

```javascript
export default {
  data: () => ({
    message: "hello"
  })
};
```

---

# `v-bind`

`v-bind="変数名"`

Attribute に値を渡すときなどに使う

単方向バインディング

- データに変更があったら ➜ View が変更される
- View に変更があっても ➜ データに変更はされない

```html
<p v-bind:title="message">{{ message }}, vue</p>
```

または

```html
<p :title="message">{{ message }}, vue</p>
```

マウスオーバーしたら hello とオーバーレイされる

---

# イベント

## 独自メソッドの設定

`v-on:イベント名="メソッド名"`

```html
<button v-on:click="countUp">count</button>
```

または

```html
<button @click="countUp">count</button>
```

```javascript
export default {
  data: () => ({
    message: "hello"
  }),
  methods: {
    countUp(e) {
      console.log(e);
    }
  }
};
```

ボタンをクリックすると，コンソールにイベントが吐かれる

## data の更新

```html
<button @click="countUp">count: {{ count }}</button>
```

`count`と`this.count++;`を追記

```javascript
export default {
  data: () => ({
    message: "hello",
    count: 0
  }),
  methods: {
    countUp(e) {
      console.log(e);
      this.count++;
    }
  }
};
```

クリックすると，data の count に 1 足す

---

# ライフサイクル

コンポーネントのライフサイクルに応じて，処理を書ける

## メソッドの種類

- `beforeCreate`: インスタンスが作成される前
- `created`: インスタンスが作成された後
- `beforeMount`: マウントされる前
- `mounted`: マウントされた後
- `beforeUpdate`: 状態を更新し、再描画される前
- `updated`: 状態を更新し、再描画した後
- `beforeDestroy`: インスタンスが破棄される前
- `destroyed`: インスタンスが破棄された後

コンポーネントのライフサイクルの詳細は
https://jp.vuejs.org/v2/guide/instance.html#ライフサイクルダイアグラム
を参照

## 使い方

```javascript
mounted() {
  console.log("mounted");
}
```

- 画面をリロードすると，コンソールに"mounted"と表示されている
- ちなみに`mounted`では DOM にアクセスできる状態

---

# if, else, show, for

## if

`v-if="条件"`

条件に応じて，要素の表示/非表示を切り替える
条件部分には JS も書ける
非表示のときは，要素自体が消える

```html
<span v-if="count % 2 === 0">偶数</span>
```

ボタンを押すと，偶数のときだけ要素が表れる

## else

`v-if`の後に使用可能
（ちなみに間に`v-else-if=""`も書けるよ）

```html
<span v-else>奇数</span>
```

ボタンを押すと，偶数と奇数が交互に表れる

## show

`v-show="条件"`

条件が`true`の時に要素を表示する
CSS で表示を切り替える

```html
<span v-show="count % 3 === 0">・3の倍数</span>
```

- ボタンを押して，3 の倍数のときに表示される
- （ちなみに数学的には 0 はすべての整数の倍数らしい）

## `v-if`と`v-show`の使い分け

- show は CSS で表示を切り替えているため描画コストが低い（らしい）
- 頻繁に更新するものは`v-show`を使うのが良さげ

## for

`v-for="1要素やプロパティ in 配列やオブジェクト"`

配列の要素やオブジェクトのプロパティをもとに繰り返す

Vue がリスト内での要素の識別するため，`:key`に一意な数値や文字列を指定する

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

`todos`という配列を設け，追加処理を書く

```javascript
data: () => ({
  message: "hello",
  count: 0,
  todos: [{ id: 0, text: "todo 0", done: true }]
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
```

ボタンを押すと，要素を追加していく

---

# 子コンポーネントを作成する

## 作成

`components/`に`TodoItem.vue`を作成

```html
<template>
  <li>TodoItem</li>
</template>

<script>
export default {};
</script>
```

## 使う

`App.vue`で import して，`components`に設定し，使う

```html
<ul>
  <TodoItem/>
</ul>
```

```javascript
<script>
import TodoItem from "./TodoItem";

export default {
  /* */
  components: { TodoItem },
  /* */
};
</script>
```

## props

親コンポーネントから子コンポーネントに渡す値（Properties）
（親: `App.vue`, 子: `TodoItem.vue`）

- `TodoItem.vue`で，`props`に`todo`を指定する
- その値の型と必須項目かも書くようにする

```html
<template>
  <li>{{ todo.text }} {{ todo.done ? "済": "" }}</li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>
```

`App.vue`で`v-bind`を使って，`props`として`todo`に todo オブジェクトを渡す

```html
<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
```

ボタンを押すと，済の状態を持つ`TodoItem`が表示される

---

# フォームのデータを取得する

`v-bind`はデータを View に流し込むだけだったが，
フォームは入力した値を JS に伝える必要がある

## `v-model`

`v-model="変数名"`
データとフォーム内の値を同期する

双方向バインディング

- データに変更があったら ➜ View が変更される
- View に変更があったら ➜ データも変更される

## input

`input`という変数と同期

```html
<p>
  <input v-model="input" placeholder="記入してください">
  <span>input: {{ input }}</span>
</p>
```

```javascript
data: () => ({
  message: "hello",
  count: 0,
  todos: [{ id: 0, text: "todo 0", done: true }],
  input: ""
}),
```

input 内のテキストが変わると，右側の表示も変わる

## select

`selected`という変数と同期

```html
<select v-model="selected">
  <option value disabled>選択してください</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>選択肢: {{ selected }}</span>
```

```javascript
data: () => ({
  message: "hello",
  count: 0,
  todos: [{ id: 0, text: "todo 0", done: true }],
  input: "",
  selected: ""
}),
```

## checkbox

`checked`という配列と同期

```html
<div>
  <input type="checkbox" id="red" value="赤" v-model="checked">
  <label for="red">赤</label>
  <input type="checkbox" id="green" value="緑" v-model="checked">
  <label for="green">緑</label>
  <input type="checkbox" id="blue" value="青" v-model="checked">
  <label for="blue">青</label>
  <span>チェック済み: {{ checked }}</span>
</div>
```

```javascript
data: () => ({
  message: "hello",
  count: 0,
  todos: [{ id: 0, text: "todo 0", done: true }],
  input: "",
  selected: "",
  checked: []
}),
```

---

# おわり

お疲れ様でした

これを読んだら，公式ガイドを読んでより深いところを学べるベースができているはずです

- https://jp.vuejs.org/v2/guide/

Next Step

- `vue-router`: ルーティング
- `vuex`: 状態管理
- `Nuxt`: SSR（Server Side Rendering）
- `scoped CSS`: 適応範囲が狭い CSS
