const { Ability, AbilityBuilder } = require('@casl/ability')

function getToken(req) {
    let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

    return token && token.length ? token : null;
}

const policies = {
    guest(user, { can }) {
        can('read', 'Product');
    },
    user(user, { can }) {
        can('view', 'Order');
        can('create', 'Order');
        can('create', 'Product');
        can('update', 'Product');
        can('delete', 'Product');
        can('read', 'Order', { user_id: user._id });
        can('update', 'User', { _id: user._id });
        can('read', 'Cart', { user_id: user._id });
        can('update', 'Cart', { user_id: user._id });
        can('view', 'Cart', { user_id: user._id });
        can('View', 'DeliveryAddress', { user_id: user._id });
        can('create', 'DeliveryAddress', { user_id: user._id });
        can('update', 'DeliveryAddress', { user_id: user._id });
        can('delete', 'DeliveryAddress', { user_id: user._id });
        can('read', 'Invoice', { user_id: user._id });
    },
    admin(user, { can }) {
        can('manage', 'all');
    },
}

const policyFor = (user) => {
    // console.log("User data in policyFor:", user);

    let builder = new AbilityBuilder();
    if (user && typeof policies[user.role] === 'function') {
        policies[user.role](user, builder);
    } else {
        policies.guest(user, builder);
    }

    // console.log("Generated CASL rules:", builder.rules); 
    return new Ability(builder.rules);
};


module.exports = { getToken, policyFor };
