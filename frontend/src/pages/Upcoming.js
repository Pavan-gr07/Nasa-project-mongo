import { useMemo } from "react";
import { withStyles, Appear, Link, Paragraph, Table, Words } from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = (props) => {
  const { entered, launches, classes, abortLaunch } = props;
  console.log(launches, "lla");

  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.up_coming)
      .map((launch, index) => {
        return (
          <tr key={String(launch._id)}>
            <td>
              <Clickable style={{ color: "red" }}>
                <Link
                  className={classes.link}
                  onClick={() => abortLaunch(launch._id)}
                >
                  ✖
                </Link>
              </Clickable>
            </td>
            <td>{index + 1}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.target}</td>
          </tr>
        );
      });
  }, [launches, abortLaunch, classes.link]);

  return (
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>
        Upcoming missions including both ISRO launches and newly scheduled Zero
        to Mastery rockets.
      </Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
      <Table animate show={entered}>
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "3rem" }}></th>
              <th style={{ width: "3rem" }}>No.</th>
              <th style={{ width: "10rem" }}>Date</th>
              <th style={{ width: "11rem" }}>Mission</th>
              <th style={{ width: "11rem" }}>Rocket</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </Table>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
