<template>
	<div class="menu-list-container">
		<a-menu
			ref="menu"
			mode="inline"
			:inlineCollapsed="collapsed"
			theme="dark"
			:defaultSelectedKeys="activeName"
			:defaultOpenKeys="openMenusPath"
			@select="HandleMenuSelect"
			style="height: 100%"
		>
			<template v-for="item in menuList">
				<a-menu-item v-if="!hasChildren(item)" :key="getName(item)" :title="getTitle(item)">
					<a-icon :type="getIcon(item)"/>
					<span>{{item.name}}</span>
				</a-menu-item>
				<side-menu-item v-else :menu="item" :key="item.name"/>
			</template>
		</a-menu>
	</div>
</template>
<script>
import SideMenuItem from "./side-menu-item.vue"
export default {
	name: "SideMenu",
	components: {
		SideMenuItem
	},
	props: {
		menuList: {
			type: Array,
			default() {
				return []
			}
		},
		activeName: {
			type: Array,
			default() {
				return []
			}
		},
		openMenusPath: {
			type: Array,
			default() {
				return []
			}
		},
		collapsed: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	created() {},
	mounted() {
		// console.log("select", this.activeName)
		// console.log("select path", this.openMenusPath)
	},
	data() {
		return {
			opendMenuNames: []
		}
	},
	methods: {
		HandleMenuSelect(item, key, selectedKeys) {
			this.$emit("on-select", item.key)
		},

		getOpenedNamesByActiveName(name) {
			return this.$route.matched.map(item => item.name).filter(item => item !== name)
		},

		updateOpenName(name) {
			this.opendMenuNames = this.getOpenedNamesByActiveName(name)
			// console.log(this.opendMenuNames)
		},

		getTitle(menu) {
			var title = menu.name
			if (menu.meta && menu.meta.title) {
				title = menu.meta.title
			}
			if (menu.children && menu.children.length === 1) {
				return this.getTitle(menu.children[0])
			}
			return title
		},

		getName(menu) {
			var title = menu.name
			if (menu.children && menu.children.length === 1) {
				return this.getName(menu.children[0])
			}
			return title
		},

		hasChildren(menu) {
			return menu.children && menu.children.length > 1
		},

		getIcon(menu) {
			var icon = "question-circle"
			if (menu.meta && menu.meta.icon) {
				icon = menu.meta.icon
			}
			if (menu.children && menu.children.length === 1) {
				return this.getIcon(menu.children[0])
			}
			return icon
		}
	},
	watch: {
		activeName(name) {},
		opendMenuNames(names) {}
	}
}
</script>
