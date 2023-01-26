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
        <Link to={`/companies/${company.handle}`} style={{ textDecoration: "none", textColor: "inherit" }} >
            <Card variant="outlined">
                <CardContent>
                    <div>
                        <h3>{company.name}</h3>
                        <p>{company.description}</p>
                    </div>
                    {company.logoUrl && <img src={company.logoUrl}
                        alt={`logo for ${company.name}`} />}
                </CardContent>
            </Card>
        </Link >
    );
}


export default CompanyCard;