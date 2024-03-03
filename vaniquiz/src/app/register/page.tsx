import RegisterForm from "@/components/auth/register";

export default async function newPage() {
	return (
		<div className="global-content">
			<RegisterForm />
		</div>
	);
}
