from rest_framework import permissions


class OwnerAuthenticated(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view) and request.user == obj.user


class StoreOwnerPermission(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        print(f"CurrentUser: {request.user}")
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print(f"CurrentUser: {request.user} and storeUser: {obj.store.user}")
        return self.has_permission(request, view) and request.user == obj.store.user