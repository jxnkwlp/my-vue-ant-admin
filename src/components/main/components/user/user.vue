<template>
	<div>
		<a-dropdown @on-click="handleMenuClick">
			<span class="useraction ant-dropdown-link user-dropdown-menu">
				<a-avatar class="avatar" size="small" icon="user"/>
				<span>{{ userName }}</span>
			</span>
			<a-menu slot="overlay" class="user-dropdown-menu-wrapper">
				<a-menu-item key="changepassword" @click="handleMenuClick('changepassword')">
					<a-icon type="setting"/>修改密码
				</a-menu-item>
				<a-menu-item key="message" @click="handleMenuClick('message')">
					<a-icon type="setting"/>消息中心
				</a-menu-item>
				<a-menu-divider/>
				<a-menu-item divided key="logout" @click="handleMenuClick('logout')">
					<a-icon type="logout"/>退出
				</a-menu-item>
			</a-menu>
		</a-dropdown>
	</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
	created() {},
	data() {
		return {}
	},
	computed: {
		userName() {
			return this.$store.state.user.userName
		}
	},
	methods: {
		...mapActions(["clearToken"]),
		handleMenuClick(name) {
			switch (name) {
				case "changepassword":
					this.$router.push({
						name: "change-password"
					})
					break
				case "logout":
					this.clearToken().then(() => {
						this.$router.push({
							name: "login"
						})
					})
					this.$message.success("已退出")
					break
			}
		}
	}
}
</script>
