import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityStack from "./Community/Stack";
import ProfileStack from "./Profile/Stack";
import NeighborhoodStack from "./Neighborhood/Stack";
import GamesStack from "./Games/Stack";
import { Icon } from "@rneui/themed";
import { PRIMARY_COLOR } from "../../assets/colors";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore } from "../../hooks/store";
import { AuthenticationStack } from "./Authentication/Stack";

const Tab = createBottomTabNavigator();

const Navigation = observer(() => {
  const authenticationStore = useAuthenticationStore();

  return (
    <NavigationContainer>
      {authenticationStore.isAuthenticated ? (
        <NeighborhoodNavigation />
      ) : (
        <AuthenticationNavigation />
      )}
    </NavigationContainer>
  );
});

const NeighborhoodNavigation = () => (
  <Tab.Navigator
    initialRouteName='NeighborhoodStack'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        return <Icon type='ionicon' name={getIcon(route.name)} size={size} color={color} />;
      },
      tabBarActiveTintColor: PRIMARY_COLOR,
      tabBarInactiveTintColor: "black",
    })}
  >
    <Tab.Screen
      name='NeighborhoodStack'
      component={NeighborhoodStack}
      options={{
        title: "Neighborhood",
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name='CommunityStack'
      component={CommunityStack}
      options={{
        title: "Community",
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name='GamesStack'
      component={GamesStack}
      options={{
        title: "Games",
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name='ProfileStack'
      component={ProfileStack}
      options={{
        title: "Profile",
        tabBarShowLabel: false,
      }}
    />
  </Tab.Navigator>
);

const AuthenticationNavigation = () => (
  <Tab.Navigator
    initialRouteName='AuthenticationStack'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        return <Icon type='ionicon' name={getIcon(route.name)} size={size} color={color} />;
      },
      tabBarActiveTintColor: PRIMARY_COLOR,
      tabBarInactiveTintColor: "black",
    })}
  >
    <Tab.Screen
      name='AuthenticationStack'
      component={AuthenticationStack}
      options={{
        title: "Authentication",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const getIcon = (route: string) => {
  if (route === "NeighborhoodStack") {
    return "location";
  }
  if (route === "CommunityStack") {
    return "people";
  }
  if (route === "GamesStack") {
    return "basketball";
  }
  if (route === "ProfileStack") {
    return "person";
  }
};

export default Navigation;
