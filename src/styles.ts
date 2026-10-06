import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    marginTop: 20  },

  appName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1B4965",
    letterSpacing: -1,
  },

  appNameGreen: {
    color: "#4FA47C",
  },

  paw: {
    fontSize: 25,
  },

  settingsButton: {
    width: 45,
    height: 45,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1B4965",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  settingsIcon: {
    fontSize: 20,
  },

  greeting: {
    fontSize: 35,
    fontWeight: "700",
    color: "#13293D",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7C8F",
    lineHeight: 25,
    marginBottom: 28,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 35,
    marginHorizontal: 0,
  },

  summaryCard: {
    flex: 1,
    minHeight: 100,
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#17324D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  animalCard: {
    backgroundColor: "#EEF8ED",
  },

  careCard: {
    backgroundColor: "#EAF4FC",
  },

  summaryIcon: {
    fontSize: 27,
    marginBottom: 5,
  },

  summaryNumber: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1B4965",
  },

  summaryLabel: {
    fontSize: 17,
    color: "#607589",
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#13293D",
  },

  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#348765",
  },

  careCardLarge: {
    backgroundColor: "#FFFDF8",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
    shadowColor: "#17324D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  careInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  careEmojiContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFF1D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  careEmoji: {
    fontSize: 34,
  },

  careName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1B2938",
    marginBottom: 4,
  },

  careType: {
    fontSize: 16,
    color: "#66788A",
  },

  timeContainer: {
    backgroundColor: "#EEF7ED",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
  },

  time: {
    fontSize: 18,
    fontWeight: "700",
    color: "#287A5B",
  },

  petsContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 30,
  },

  petCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: "#17324D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  petImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  ayaBackground: {
    backgroundColor: "#FFF4DF",
  },

  loopyBackground: {
    backgroundColor: "#EAF4FC",
  },

  petEmoji: {
    fontSize: 40,
  },

  petName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#172B3A",
    marginBottom: 5,
  },

  petBreed: {
    fontSize: 15,
    color: "#718090",
  },

  actionButton: {
    backgroundColor: "#4FA47C",
    height: 65,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 14,
    shadowColor: "#267051",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 7,
    elevation: 4,
  },

  actionButtonOutline: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#4FA47C",
    height: 65,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 15,
  },

  actionIcon: {
    fontSize: 26,
    marginRight: 18,
  },

  actionText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  actionTextOutline: {
    flex: 1,
    fontSize: 19,
    fontWeight: "700",
    color: "#287A5B",
  },

  arrow: {
    fontSize: 25,
    color: "#FFFFFF",
  },

  arrowOutline: {
    fontSize: 25,
    color: "#287A5B",
  },
});