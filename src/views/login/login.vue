<template>
	<div class="login-page">
		<a-card class="login-form" title="欢迎登录">
			<a-form :form="loginForm" @keydown.enter.native="handleSubmit">
				<a-form-item>
					<a-input placeholder="请输入用户名" size="large" v-decorator="['userName',{ rules: [{ required: true, message: '请输入用户名' }] }]">
						<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-input type="password" placeholder="请输入密码" size="large" v-decorator="['password',{ rules: [{ required: true, message: '请输入密码' }] }]">
						<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-item>
				<a-button @click="handleSubmit" type="primary" size="large" block :loading="submitLoading">登录</a-button>
			</a-form>
		</a-card>
	</div>
</template>

<script>
import "./login.less"
import { mapActions } from "vuex"
import * as userApi from "@/api/user"
export default {
	data() {
		return {
			loginFormDefault: {
				userName: "admin",
				password: "123456"
			},
			submitLoading: false
		}
	},
	created() {
		this.loginForm = this.$form.createForm(this)
	},
	methods: {
		...mapActions(["saveAccessToken"]),
		handleSubmit() {
			this.loginForm.validateFields((error, values) => {
				if (!error) {
					this.submitLoading = true

					userApi
						.login(values)
						.then(res => {
							var data = res.data
							if (data.token) {
								this.saveAccessToken({ token: data.token })
									.catch(error => {
										this.$Modal.error({
											title: "提示",
											content: "系统错误"
										})
									})
									.then(() => {
										this.$router.push({
											name: "home"
										})
									})
							} else {
								this.$Modal.error({
									title: "提示",
									content: data.message || "系统错误"
								})
							}
						})
						.catch(error => {
							this.$Modal.error({
								title: "提示",
								content: "系统错误"
							})
							console.error(error)
						})
						.then(res => {
							this.submitLoading = false
						})
				}
			})

			// this.$refs.loginForm.validate(valid => {
			// 	if (valid) {
			// 		this.submitLoading = true

			// 		userApi
			// 			.login(this.loginForm)
			// 			.then(res => {
			// 				var data = res.data
			// 				if (data.token) {
			// 					this.saveAccessToken({ token: data.token })
			// 						.catch(error => {
			// 							this.$Modal.error({
			// 								title: "提示",
			// 								content: "系统错误"
			// 							})
			// 						})
			// 						.then(() => {
			// 							this.$router.push({
			// 								name: "home"
			// 							})
			// 						})
			// 				} else {
			// 					this.$Modal.error({
			// 						title: "提示",
			// 						content: data.message || "系统错误"
			// 					})
			// 				}
			// 			})
			// 			.catch(error => {
			// 				this.$Modal.error({
			// 					title: "提示",
			// 					content: "系统错误"
			// 				})
			// 				console.error(error)
			// 			})
			// 			.then(res => {
			// 				this.submitLoading = false
			// 			})
			// 	}
			// })
		}
	}
}
</script>
