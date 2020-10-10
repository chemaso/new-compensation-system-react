import { get, groupBy, isEmpty, uniqBy } from 'lodash'

export const useMenuItems = () => {
    return {
        generate: (user) => {
            const codes = user.roles[0].permissions.map((item) => item.code)

            const subRouteGenerator = (val) => {
              const setPermission = (allow, current) => !isEmpty(val
                .filter((i) => i.code.indexOf(allow) !== -1)
                .filter(co => co.code.indexOf(current) !== -1))
              return val
                .map((it) => {
                    const current = it.code.split('.')[1]
                    return {
                    title: current.charAt(0).toUpperCase() + current.slice(1),
                    route: it.code.replace(/\./g, '/'),
                    base: current,
                    permissions: {
                        edit: setPermission('edit', current),
                        add: setPermission('new', current),
                        delete: setPermission('delete', current),
                        restore: setPermission('restore', current),
                    }
                    }
                })
                .filter((i) => i.title !== 'Dashboard')
            }
          
            const splitedCodes = groupBy(codes.map((item) => {
              const splited = item.split('.')
              return {
                base: splited[0],
                code: item
              }
            }), 'base')
          
            const reduced = Object
              .entries(splitedCodes)
              .map(([label, item]) => {
                return {
                  title: label.charAt(0).toUpperCase() + label.slice(1),
                  route: `/${label}`,
                  subcontent: uniqBy(subRouteGenerator(item), 'title'),
                }
              })
            return [{title: "Dashboard", route: "/", subcontent: [] }, ...reduced]
        }
    }
}