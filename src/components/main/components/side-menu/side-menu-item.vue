<template functional>
	<a-sub-menu>
		<span slot="title" :key="props.menu.name" :title="$options.getTitle(props.menu)">
			<a-icon :type="$options.getIcon(props.menu)"/>
			<span>{{$options.getTitle(props.menu)}}</span>
		</span>
		<template v-if="$options.hasChildren(props.menu)">
			<template v-for="item in props.menu.children">
				<a-menu-item v-if="!$options.hasChildren(item)" :key="$options.getName(item)" :title="$options.getTitle(item)">
					<a-icon :type="$options.getIcon(item)"/>
					<span>{{$options.getTitle(item)}}</span>
				</a-menu-item>

				<!-- 递归 -->
				<side-menu-item v-else :menu="item" :key="item.name"/>
			</template>
		</template>
	</a-sub-menu>
</template>

<script>
import CommonIcon from "@/components/common-icon"
export default {
	name: "SideMenuItem",
	components: {
		CommonIcon
	},
	props: {
		menu: {
			type: Object
		}
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
}
</script>
