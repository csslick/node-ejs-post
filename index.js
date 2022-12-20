const express = require('express');
const app = express();
const ejs = require('ejs');

// 글 DB
const posts = [
  '첫번째 글',
];

// post 요청시 필요
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get('/', function(요청, 응답){
  응답.render('pages/index.ejs', { posts })
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// create
app.post('/create', function(req, res) {
  const post = req.body.post;
  console.log(req.body)
  // DB에 글 저장
  posts.push(post);
  console.log(posts);
  
  // 홈(게시판)으로 이동
  res.redirect('/');
})


const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})