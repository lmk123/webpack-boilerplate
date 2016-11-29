const { body } = document

// 消除移动端 300ms 的点击延迟
import FastClick from 'fastclick'
FastClick.attach(body)

// 启动 web app
import Vue from 'vue'
import Root from './root.vue'

const div = document.createElement('div')
body.appendChild(div)
new Vue(Root).$mount(div)
