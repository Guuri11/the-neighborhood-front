import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityStack from "./Community/Stack";
import ProfileStack from "./Profile/Stack";
import NeighborhoodStack from "./Neighborhood/Stack";
import GamesStack from "./Games/Stack";
import { Icon } from "@rneui/themed";
import { PRIMARY_COLOR } from "../../assets/colors";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const getIcon = (route: string) => {
    if (route === "NeighborhoodStack") {
      return "location"
    }
    if (route === "CommunityStack") {
      return "people"
    }
    if (route === "GamesStack") {
      return "basketball"
    }
    if (route === "ProfileStack") {
      return "person"
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='NeighborhoodStack' screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return <Icon type="ionicon" name={getIcon(route.name)} size={size} color={color} />;
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
          tabBarInactiveTintColor: "black",
        })}>
        <Tab.Screen
          name='NeighborhoodStack'
          component={NeighborhoodStack}
          options={{
            title: "Neighborhood",
            tabBarShowLabel: false
          }}
        />
        <Tab.Screen
          name='CommunityStack'
          component={CommunityStack}
          options={{
            title: "Community",
            tabBarShowLabel: false
          }}
        />
        <Tab.Screen
          name='GamesStack'
          component={GamesStack}
          options={{
            title: "Games",
            tabBarShowLabel: false
          }}
        />
        <Tab.Screen
          name='ProfileStack'
          component={ProfileStack}
          options={{
            title: "Profile",
            tabBarShowLabel: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
