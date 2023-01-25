import { Link } from "react-router-dom";
import { Card, CardContent } from '@mui/material';

/**
 * Renders a single card with details passed down from CompanyList
 * 
 * props: company - an object with details about a single company
 * 
 * CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {

    return (
        <Card variant="outlined">
            <CardContent>
                <Link to={`/companies/${company.handle}`} >
                    <div>
                        <p>{company.name}</p>
                        <p>{company.description}</p>
                    </div>
                    <img src={company.logoUrl} alt={`logo for ${company.name}`} />
                </Link >
            </CardContent>
        </Card>
    );
}


export default CompanyCard;