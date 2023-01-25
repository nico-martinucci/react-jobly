

/**
 * Renders a single card with details passed down from CompanyList
 * 
 * props: company - an object with details about a single company
 * 
 * CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {

    return (
        <>
            <div>{company.name} {company.description}</div>
            <img src={company.logoUrl} />
        </>
    );
}


export default CompanyCard;