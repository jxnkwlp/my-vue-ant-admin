<template>
	<a-layout class="main">
		<!-- 侧边栏 -->
		<a-layout-sider :width="256" :style="{overflow: 'hidden'}" class="left-sider">
			<div class="left-sider-header">{{siteName}}</div>

			<side-menu
				ref="sideMenu"
				:collapsed="isCollapsed"
				:menuList="menuList"
				:active-name="[$route.name]"
				:open-menus-path="menuOpenList"
				@on-select="handleMenuRoute"
			></side-menu>
		</a-layout-sider>
		<!-- 左侧 -->
		<a-layout>
			<!-- 头部 -->
			<a-layout-header class="top-header">
				<!-- 折叠按钮 -->
				<!-- <a-icon class="trigger" :type="isCollapsed ? 'menu-unfold' : 'menu-fold'" @click="handleChangeMenuCollapsed"/> -->
				<!-- 左 -->
				<div class="top-header-left">{{pageTitle}}</div>
				<!-- 右 操作 -->
				<user class="top-header-user"></user>
			</a-layout-header>
			<a-layout-content class="main-content">
				<a-layout class="main-content-layout">
					<a-layout class="content-wrapper">
						<!-- 内容区 -->
						<router-view/>
					</a-layout>
				</a-layout>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script>
import "./main.less"
import { getMenuList } from "@/libs/tools"

import config from "@/config"

import SideMenu from "./components/side-menu/side-menu.vue"
import User from "./components/user/user.vue"

export default {
	components: {
		SideMenu,
		User
	},
	data() {
		return {
			pageTitle: "",
			isCollapsed: false,
			siteName: config.siteTitle
		}
	},
	computed: {
		menuitemClasses: function() {
			return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""]
		},
		menuList: function() {
			return getMenuList([])
		},
		menuOpenList: function() {
			return this.$route.matched.map(item => item.name).filter(item => item !== this.$route.name)
		}
	},
	methods: {
		handleChangeMenuCollapsed() {
			this.isCollapsed = !this.isCollapsed
			console.log(this.isCollapsed)
		},
		handleMenuRoute(route) {
			let { name, params, query } = {}
			if (typeof route === "string") name = route
			else {
				name = route.name
				params = route.params
				query = route.query
			}
			if (name.indexOf("isTurnByHref_") > -1) {
				window.open(name.split("_")[1])
				return
			}
			this.$router.push({
				name,
				params,
				query
			})
		}
	},
	watch: {
		// 页面地址改变
		$route(newRoute) {
			const { name, query, params, meta } = newRoute
			this.$refs.sideMenu.updateOpenName(newRoute.name)
		}
	},
	mounted() {
		// 首次打开
		this.$refs.sideMenu.updateOpenName(this.$route)
	}
}
</script>
