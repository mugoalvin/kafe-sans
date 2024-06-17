import Header from "@/Views/Header"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

const Reservations = ({ auth } : PageProps ) => {

	let isCustomer = auth.user.isCustomer

  	return (
		<>
			<Head title="Reservations"/>

			<Header loggedInUser={auth.user} isCustomer={isCustomer} />
			<div>Reservations</div>
		</>
  	)
}

export default Reservations