const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

// 글 DB
let posts = [];

// post 요청시 필요
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// 파일 불러오기
const readfile = fs.readFileSync('postsDB.json', 'utf-8');
const jsonData = JSON.parse(readfile)
console.log(jsonData)
posts = [...jsonData].reverse(); // 내림차 순(최신 글)순으로 변경

// home
app.get('/', function(req, res){
  res.render('pages/index.ejs', { posts })
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// create
app.post('/create', function(req, res) {
  const name = req.body.name;
  const post = req.body.post;
  console.log(req.body)
  // DB에 글 저장
  posts.push({ name, post });
  fs.writeFileSync('postsDB.json', JSON.stringify(posts))
  console.log(posts);
  
  // 홈(게시판)으로 이동
  res.redirect('/');
})


const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})