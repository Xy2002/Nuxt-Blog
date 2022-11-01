<template>
	<code>
		<slot />
	</code>
</template>

<style scoped>
code {
	/* border-radius: 3px; */
	padding: 0.2em 0.4em;
	font-size: 85%;
	tab-size: 2;
	color: #eb5757;
	/* background-color: rgba(135, 131, 120, 0.15); */
	caret-color: rgb(55, 53, 47);
}
.dark code {
	caret-color: rgba(255, 255, 255, 0.81);
}
</style>
