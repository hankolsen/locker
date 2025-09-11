export const overviewOperation = {
  operationName: 'Overview',
  query: `query Overview($giid: String!) {
      installation(giid: $giid) {
        alias
        locale

        climates {
          device {
            deviceLabel
            area
            gui {
              label
              __typename
            }
            __typename
          }
          humidityEnabled
          humidityTimestamp
          humidityValue
          temperatureTimestamp
          temperatureValue
          thresholds {
            aboveMaxAlert
            belowMinAlert
            sensorType
            __typename
          }
          __typename
        }

        armState {
          type
          statusType
          date
          name
          changedVia
          __typename
        }

        doorWindows {
          device {
            deviceLabel
            area
            gui {
              support
              label
              __typename
            }
            __typename
          }
          type
          state
          wired
          reportTime
          __typename
        }

        smartplugs {
          device {
            deviceLabel
            area
            gui {
              support
              label
              __typename
            }
            __typename
          }
          currentState
          icon
          isHazardous
          __typename
        }

        doorlocks {
          device {
            area
            deviceLabel
            __typename
          }
          currentLockState
          __typename
        }

        __typename
      }
    }`,
};

export const doorLockOperation = (deviceLabel: string, code: string) => ({
  operationName: 'DoorLock',
  variables: {
    deviceLabel,
    input: { code },
  },
  query: `mutation DoorLock($giid: String!, $deviceLabel: String!, $input: LockDoorInput!) {
      transactionId: DoorLock(giid: $giid, deviceLabel: $deviceLabel, input: $input)
    }`,
});
