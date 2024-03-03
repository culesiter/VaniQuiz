import LoginForm from "@/components/auth/login";
export default async function newPage() {
	return (
		<div className="global-content">
			<LoginForm />
		</div>
	);
}
