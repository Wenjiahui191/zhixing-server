const { exec, escape } = require("../db/mysql");
const xss = require("xss");

// 获取博客列表
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author=${escape(author)} `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  return await exec(sql);
};

// 获取博客详情
const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

// 新建博客
const createBlog = async (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createtime = Date.now();
  const sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}',${createtime},'${author}')`;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

// 更新博客信息
const updateBlog = async (id, updateBlogData = {}) => {
  let { title, content } = updateBlogData;
  title = xss(title);
  content = xss(content);
  let sql = `update blogs set title='${title}',content='${content}' where id='${id}'`;
  const changeData = await exec(sql);
  return changeData.affectedRows && changeData.affectedRows > 0;
};

// 删除
const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  const changeData = await exec(sql);
  return changeData.affectedRows && changeData.affectedRows > 0;
};

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  delBlog,
};
