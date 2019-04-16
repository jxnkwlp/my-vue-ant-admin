<template>
	<div>
		<h1>home</h1>

		<a-button type="primary" @click="handleLoadingbar">Start</a-button>

		<a-menu mode="inline" :inlineCollapsed="false" style="height: 100%" :defaultOpenKeys="selectPath" :defaultSelectedKeys="select">
			<a-sub-menu key="sub1">
				<span slot="title">
					<a-icon type="user"/>subnav 1
				</span>
				<a-menu-item key="1">option1</a-menu-item>
				<a-menu-item key="2">option2</a-menu-item>
				<a-menu-item key="3">option3</a-menu-item>
				<a-menu-item key="4">option4</a-menu-item>
			</a-sub-menu>

			<a-sub-menu key="sub2">
				<span slot="title">
					<a-icon type="laptop"/>subnav 2
				</span>
				<a-menu-item key="5">option5</a-menu-item>
				<a-menu-item key="6">option6</a-menu-item>
				<a-menu-item key="7">option7</a-menu-item>
				<a-menu-item key="8">option8</a-menu-item>

				<a-sub-menu key="sub3">
					<span slot="title">
						<a-icon type="notification"/>subnav 3
					</span>
					<a-menu-item key="9">option9</a-menu-item>
					<a-menu-item key="10">option10</a-menu-item>
					<a-menu-item key="11">option11</a-menu-item>
					<a-menu-item key="12">option12</a-menu-item>
				</a-sub-menu>
			</a-sub-menu>

			<a-sub-menu key="sub4">
				<span slot="title">
					<a-icon type="notification"/>subnav 3
				</span>
				<a-menu-item key="13">option9</a-menu-item>
				<a-menu-item key="14">option10</a-menu-item>
				<a-menu-item key="15">option11</a-menu-item>
				<a-menu-item key="16">option12</a-menu-item>
			</a-sub-menu>
		</a-menu>
	</div>
</template>

<script>
import NProgress from "nprogress"
export default {
	data() {
		return {
			selectPath: ["sub2", "sub3"],
			select: ["10"]
		}
	},
	methods: {
		handleLoadingbar() {
			console.log(1)
			NProgress.start()
			// this.$nprogress.start()
		}
	}
}
</script>
