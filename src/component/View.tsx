import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row } from "../interface";

interface State {
  data: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}

const View = () => {
  const { id } = useParams();

  const rows = useSelector((state: State) =>
    state?.data?.rows?.filter((row) => row?.id === id)
  );
  const data = rows[0];
  const redirect = useNavigate();
  const htmlText = data?.description;

  const goBack = () => {
    redirect("/");
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>View Page</h1>
      <Card style={{ margin: "auto", width: "60%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name: <b>{data?.name}</b>
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Type:<b>{data?.type} </b>
          </Typography>
          <div>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description:
              <Typography
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: htmlText }}
              />
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={goBack}>
            Back
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default View;
