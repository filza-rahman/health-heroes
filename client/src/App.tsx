import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import ChallengeDetail from "./pages/ChallengeDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/challenge"} component={ChallengeDetail} />
      <Route path={"/auth"} component={Auth} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
