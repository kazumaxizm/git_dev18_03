
// ★STEP2：ローカルストレージを使用（WEB STOREAGE APIを使用）
// https://jp.vuejs.org/v2/examples/todomvc.html

// KEYの名前を指定（固定）
var STORAGE_KEY = 'dev18_03'

// todoStorageっていうオブジェクトを作って、その中に複数のメソッドを用意している？
// これはvueの書き方なのか、jsの書き方なのか・・・
var todoStorage = {
  // fetch関数を作成
  fetch: function () {
    // すでにtodoStorageに入っている値をとったりしてる。
    // KEYに合致する値をとってきて、jsonのキーペア単位でparseしてる。最後の表記でデータ全体を囲ってる？
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // todosの中身をインデックス付きで抜き出してるっぽい
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    // 合計のユーザ数を記録してるっぽい
    todoStorage.uid = todos.length
    return todos
  },
  // save関数を作成
  save: function (todos) {
    // キーとtodosをjson文字列にしたものをsetItemでローカルストレージに保存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// ★STEP1：インスタンスを作成する
new Vue({
  el: '#app',

  // dataの中身
  data: {
    // ★STEP5 localStorage から 取得した ToDo のリスト
    todos: [],
    // ★STEP11 抽出しているToDoの状態
    current: -1,
    // ★STEP11＆STEP13 各状態のラベル
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ]
  },

  // computed（methodsとまぁ同じようなもの）
  computed: {
    // ★STEP12
    computedTodos: function () {
      // currentが-1の場合、すべて
      // それ以外なら、currentとstateが一致するものだけに絞り込み
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)

    },

    // ★STEP13 作業中・完了のラベルを表示する
    labels() {
      // ここも動きがちょっと謎いなぁ。オプションの値を操作しているんだろうけど。
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  },

  // ★STEP8 watchオプションのウォッチャを使うとかなんとか
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function (todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  // ★STEP9
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },

  methods: {

    // ★STEP7 ToDo 追加の処理
    doAdd: function (event, value) {
      // ref で名前を付けておいた要素を参照
      // $refs.commentで、HTML側でref=に指定した要素のデータが変数commentに入るっぽい
      var comment = this.$refs.comment
      var limit = this.$refs.limit

      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        limit: limit.value,
        state: 0
      })

      // フォーム要素を空にする
      comment.value = ''
      limit.value = ''
    },

    // ★STEP10 状態変更の処理
    doChangeState: function (item) {
      item.state = !item.state ? 1 : 0
    },

    // ★STEP10 削除の処理
    doRemove: function (item) {
      if (window.confirm('完全に削除されますが宜しいですか？')) {
        var index = this.todos.indexOf(item)
        this.todos.splice(index, 1)
      } else {
        alert('削除をキャンセルしました。');
      }
    }

  }
})

var app2 = new Vue({
  el: "#app_2",
  components: {
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
});

var app3 = new Vue({
  el: '#app_3',
  data: {
    images: [
      { url: "https://tshop.r10s.jp/book/cabinet/0111/4910056260111.jpg?fitin=160:168&composite-to=0,*|160:168", alt: "test1" },
      { url: "https://tshop.r10s.jp/book/cabinet/0114/4910013350114.jpg?fitin=160:168&composite-to=0,*|160:168", alt: "test2" },
      { url: "https://tshop.r10s.jp/book/cabinet/0213/4910045410213.jpg?fitin=160:168&composite-to=0,*|160:168", alt: "test3" },
      { url: "https://tshop.r10s.jp/book/cabinet/0110/4910159850110.jpg?fitin=160:168&composite-to=0,*|160:168", alt: "test4" },
      { url: "https://tshop.r10s.jp/book/cabinet/1209/4910024731209.jpg?fitin=160:168&composite-to=0,*|160:168", alt: "test4" }
    ]
  }
})

var app4 = new Vue({
  el: '#app_4',
  data: {
    isChild: true,
    isActive: true,
    textColor: '#fff',
    bgColor: 'green'
  }
})