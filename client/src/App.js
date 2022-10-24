import React from "react";

// Import router components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TeamMemberDashboard from "./pages/TeamMemberDashboard";
import TeamMemberCreate from "./pages/TeamMemberCreate";
import TeamMemberUpdate from "./pages/TeamMemberUpdate";
import ProjectDashboard from "./pages/ProjectDashboard";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectFeatures from "./pages/ProjectFeatures";
import ProjectTasks from "./pages/ProjectTasks";
import Project from "./pages/Project";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/myteam" component={TeamMemberDashboard} />
          <Route
            exact
            path="/myteam/addteammember"
            component={TeamMemberCreate}
          />
          <Route
            exact
            path="/myteam/:teamMemberId"
            component={TeamMemberUpdate}
          />
          <Route exact path="/myprojects" component={ProjectDashboard} />
          <Route
            exact
            path="/myprojects/addproject"
            component={ProjectCreate}
          />
          <Route exact path="/myprojects/:projectId" component={Project} />
          <Route
            exact
            path="/myprojects/:projectId/features"
            component={ProjectFeatures}
          />
          <Route
            exact
            path="/myprojects/:projectId/features/:featureId"
            component={ProjectTasks}
          />
          <Route path="*" component={NoMatch} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
