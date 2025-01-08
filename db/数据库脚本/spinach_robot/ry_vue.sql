/*
 Navicat MySQL Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50741
 Source Host           : localhost:3306
 Source Schema         : ry-vue

 Target Server Type    : MySQL
 Target Server Version : 50741
 File Encoding         : 65001

 Date: 07/12/2024 00:06:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gen_table
-- ----------------------------
DROP TABLE IF EXISTS `gen_table`;
CREATE TABLE `gen_table`  (
  `table_id` bigint(20) NULL DEFAULT NULL,
  `table_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `table_comme` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sub_table_n` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sub_table_f` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `class_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tpl_categor` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `package_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `module_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `business_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `function_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `function_au` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gen_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gen_path` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `options` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table
-- ----------------------------

-- ----------------------------
-- Table structure for gen_table_column
-- ----------------------------
DROP TABLE IF EXISTS `gen_table_column`;
CREATE TABLE `gen_table_column`  (
  `column_id` bigint(20) NULL DEFAULT NULL,
  `table_id` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `column_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `column_comm` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `column_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `java_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `java_field` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_pk` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_incremen` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_required` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_insert` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_edit` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_list` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_query` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `query_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `html_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dict_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` int(11) NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table_column
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_blob_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_blob_triggers`;
CREATE TABLE `qrtz_blob_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `blob_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_blob_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_calendars
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_calendars`;
CREATE TABLE `qrtz_calendars`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `calendar_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `calendar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_calendars
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_cron_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_cron_triggers`;
CREATE TABLE `qrtz_cron_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cron_expres` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time_zone_i` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_cron_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_fired_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_fired_triggers`;
CREATE TABLE `qrtz_fired_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `entry_id` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `instance_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fired_time` bigint(20) NULL DEFAULT NULL,
  `sched_time` bigint(20) NULL DEFAULT NULL,
  `priority` int(11) NULL DEFAULT NULL,
  `state` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_group` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_nonconcu` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `requests_re` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_fired_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_job_details
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_job_details`;
CREATE TABLE `qrtz_job_details`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_group` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_class_n` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_durable` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_nonconcu` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_update_d` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `requests_re` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_job_details
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_locks
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_locks`;
CREATE TABLE `qrtz_locks`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lock_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_locks
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_paused_trigger_grps
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_paused_trigger_grps`;
CREATE TABLE `qrtz_paused_trigger_grps`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_paused_trigger_grps
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_scheduler_state
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_scheduler_state`;
CREATE TABLE `qrtz_scheduler_state`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `instance_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_checki` bigint(20) NULL DEFAULT NULL,
  `checkin_int` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_scheduler_state
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_simple_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_simple_triggers`;
CREATE TABLE `qrtz_simple_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `repeat_coun` bigint(20) NULL DEFAULT NULL,
  `repeat_inte` bigint(20) NULL DEFAULT NULL,
  `times_trigg` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_simple_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_simprop_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_simprop_triggers`;
CREATE TABLE `qrtz_simprop_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `str_prop_1` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `str_prop_2` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `str_prop_3` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `int_prop_1` int(11) NULL DEFAULT NULL,
  `int_prop_2` int(11) NULL DEFAULT NULL,
  `long_prop_1` bigint(20) NULL DEFAULT NULL,
  `long_prop_2` bigint(20) NULL DEFAULT NULL,
  `dec_prop_1` double NULL DEFAULT NULL,
  `dec_prop_2` double NULL DEFAULT NULL,
  `bool_prop_1` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bool_prop_2` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_simprop_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_triggers`;
CREATE TABLE `qrtz_triggers`  (
  `sched_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_nam` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_gro` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_group` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `next_fire_t` bigint(20) NULL DEFAULT NULL,
  `prev_fire_t` bigint(20) NULL DEFAULT NULL,
  `priority` int(11) NULL DEFAULT NULL,
  `trigger_sta` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `trigger_typ` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_time` bigint(20) NULL DEFAULT NULL,
  `end_time` bigint(20) NULL DEFAULT NULL,
  `calendar_na` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `misfire_ins` int(11) NULL DEFAULT NULL,
  `job_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qrtz_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `config_id` int(11) NULL DEFAULT NULL,
  `config_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `config_key` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `config_valu` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `config_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, '主框架页-默认皮肤样式名称', 'sys.index.skinName', 'skin-blue', 'Y', 'admin', '2023-03-27', NULL, NULL, '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow');
INSERT INTO `sys_config` VALUES (2, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 'admin', '2023-03-27', NULL, NULL, '初始化密码 123456');
INSERT INTO `sys_config` VALUES (3, '主框架页-侧边栏主题', 'sys.index.sideTheme', 'theme-dark', 'Y', 'admin', '2023-03-27', NULL, NULL, '深色主题theme-dark，浅色主题theme-light');
INSERT INTO `sys_config` VALUES (4, '账号自助-验证码开关', 'sys.account.captchaEnabled', 'true', 'Y', 'admin', '2023-03-27', NULL, NULL, '是否开启验证码功能（true开启，false关闭）');
INSERT INTO `sys_config` VALUES (5, '账号自助-是否开启用户注册功能', 'sys.account.registerUser', 'false', 'Y', 'admin', '2023-03-27', NULL, NULL, '是否开启注册用户功能（true开启，false关闭）');
INSERT INTO `sys_config` VALUES (6, '用户登录-黑名单列表', 'sys.login.blackIPList', NULL, 'Y', 'admin', '2023-03-27', NULL, NULL, '设置登录IP黑名单限制，多个匹配项以;分隔，支持匹配（*通配、网段）');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` bigint(20) NULL DEFAULT NULL,
  `parent_id` bigint(20) NULL DEFAULT NULL,
  `ancestors` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `order_num` int(11) NULL DEFAULT NULL,
  `leader` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `del_flag` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (100, 0, '0', 'VIP', NULL, '代清阳', '15338633984', '15338633984@163.com', '0', '0', 'admin', '2023-03-27', 'admin', '2023-09-19');
INSERT INTO `sys_dept` VALUES (101, 100, '0,100', '管理部门', 1, '代清阳1', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2023-03-27', 'admin', '2024-02-20');
INSERT INTO `sys_dept` VALUES (102, 100, '0,100', '长沙分公司', 2, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (103, 101, '0,100,101', '研发部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (104, 101, '0,100,101', '市场部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (105, 101, '0,100,101', '测试部门', 3, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (106, 101, '0,100,101', '财务部门', 4, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (107, 101, '0,100,101', '运维部门', 5, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (108, 102, '0,100,102', '市场部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (109, 102, '0,100,102', '财务部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2023-03-27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (200, 100, '0,100', '酒神代理商', 1, '代清阳', '15339633984', '15339633984@163.com', '0', '2', 'admin', '2023-03-29', 'admin', '2023-03-29');
INSERT INTO `sys_dept` VALUES (201, 100, '0,100', '代理商', 2, NULL, NULL, NULL, '0', '2', 'admin', '2023-03-29', 'admin', '2023-03-29');
INSERT INTO `sys_dept` VALUES (202, 201, '0,100,201', '运营部门', 1, '王涛', NULL, NULL, '0', '2', 'admin', '2023-03-29', NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `dict_code` bigint(20) NULL DEFAULT NULL,
  `dict_sort` int(11) NULL DEFAULT NULL,
  `dict_label` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dict_value` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dict_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `css_class` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `list_class` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_default` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES (1, 1, '男', '0', 'sys_user_sex', NULL, NULL, 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '性别男');
INSERT INTO `sys_dict_data` VALUES (2, 2, '女', '1', 'sys_user_sex', NULL, NULL, 'N', '0', 'admin', '2023-03-27', NULL, NULL, '性别女');
INSERT INTO `sys_dict_data` VALUES (3, 3, '未知', '2', 'sys_user_sex', NULL, NULL, 'N', '0', 'admin', '2023-03-27', NULL, NULL, '性别未知');
INSERT INTO `sys_dict_data` VALUES (4, 1, '显示', '0', 'sys_show_hide', NULL, 'primary', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '显示菜单');
INSERT INTO `sys_dict_data` VALUES (5, 2, '隐藏', '1', 'sys_show_hide', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '隐藏菜单');
INSERT INTO `sys_dict_data` VALUES (6, 1, '正常', '0', 'sys_normal_disable', NULL, 'primary', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (7, 2, '停用', '1', 'sys_normal_disable', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (8, 1, '正常', '0', 'sys_job_status', NULL, 'primary', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (9, 2, '暂停', '1', 'sys_job_status', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (10, 1, '默认', 'DEFAULT', 'sys_job_group', NULL, NULL, 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '默认分组');
INSERT INTO `sys_dict_data` VALUES (11, 2, '系统', 'SYSTEM', 'sys_job_group', NULL, NULL, 'N', '0', 'admin', '2023-03-27', NULL, NULL, '系统分组');
INSERT INTO `sys_dict_data` VALUES (12, 1, '是', 'Y', 'sys_yes_no', NULL, 'primary', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '系统默认是');
INSERT INTO `sys_dict_data` VALUES (13, 2, '否', 'N', 'sys_yes_no', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '系统默认否');
INSERT INTO `sys_dict_data` VALUES (14, 1, '通知', '1', 'sys_notice_type', NULL, 'warning', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '通知');
INSERT INTO `sys_dict_data` VALUES (15, 2, '公告', '2', 'sys_notice_type', NULL, 'success', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '公告');
INSERT INTO `sys_dict_data` VALUES (16, 1, '正常', '0', 'sys_notice_status', NULL, 'primary', 'Y', '0', 'admin', '2023-03-27', NULL, NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (17, 2, '关闭', '1', 'sys_notice_status', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '关闭状态');
INSERT INTO `sys_dict_data` VALUES (18, 99, '其他', '0', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '其他操作');
INSERT INTO `sys_dict_data` VALUES (19, 1, '新增', '1', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '新增操作');
INSERT INTO `sys_dict_data` VALUES (20, 2, '修改', '2', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '修改操作');
INSERT INTO `sys_dict_data` VALUES (21, 3, '删除', '3', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '删除操作');
INSERT INTO `sys_dict_data` VALUES (22, 4, '授权', '4', 'sys_oper_type', NULL, 'primary', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '授权操作');
INSERT INTO `sys_dict_data` VALUES (23, 5, '导出', '5', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '导出操作');
INSERT INTO `sys_dict_data` VALUES (24, 6, '导入', '6', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '导入操作');
INSERT INTO `sys_dict_data` VALUES (25, 7, '强退', '7', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '强退操作');
INSERT INTO `sys_dict_data` VALUES (26, 8, '生成代码', '8', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '生成操作');
INSERT INTO `sys_dict_data` VALUES (27, 9, '清空数据', '9', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '清空操作');
INSERT INTO `sys_dict_data` VALUES (28, 1, '成功', '0', 'sys_common_status', NULL, 'primary', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (29, 2, '失败', '1', 'sys_common_status', NULL, 'danger', 'N', '0', 'admin', '2023-03-27', NULL, NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (30, NULL, '全部', '0', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (31, 1, '充值', '1', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (32, 2, '上注', '2', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (33, 3, '申请提现', '3', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (34, 4, '反水', '4', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (35, 5, '中奖', '5', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (36, 6, '取消上注', '6', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (37, 7, '彩金提现', '7', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (38, 8, '提现打款记录', '8', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (39, 9, '彩金打款记录', '9', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-11', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (42, NULL, 'USDT', '1', 'wallet_type_dic', NULL, 'default', 'N', '0', 'admin', '2024-11-19', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (43, 1, 'TRX', '2', 'wallet_type_dic', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-22', NULL);
INSERT INTO `sys_dict_data` VALUES (44, 2, '积分', '3', 'wallet_type_dic', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-22', NULL);
INSERT INTO `sys_dict_data` VALUES (45, 3, '彩U', '4', 'wallet_type_dic', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-22', NULL);
INSERT INTO `sys_dict_data` VALUES (46, 10, '转账', '10', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (47, 11, '收款', '11', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (48, 12, '发红包', '12', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (49, 13, '领红包', '13', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (50, 14, '转账退款', '14', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (51, 15, '红包退款', '15', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (52, 16, '首充返利', '16', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (53, 17, '开业豪礼', '17', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-19', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (54, NULL, '骰子', '1', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (55, NULL, 'PC28', '2', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (56, NULL, 'PC28高倍', '3', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (57, NULL, '极速骰子', '7', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (58, NULL, '骰子反水', '4', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (59, NULL, 'PC2.0反水', '5', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (60, NULL, 'PC2.8高倍', '6', 'game_type', NULL, 'default', 'N', '0', 'admin', '2024-11-20', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (61, 18, '救援金', '18', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-21', 'admin', '2024-11-21', NULL);
INSERT INTO `sys_dict_data` VALUES (62, 101, '邀请返利', '101', 'payment_type', NULL, 'default', 'N', '0', 'admin', '2024-11-22', NULL, NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (63, 4, '彩T', '5', 'wallet_type_dic', NULL, 'default', 'N', '0', 'admin', '2024-11-22', 'admin', '2024-11-22', NULL);

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `dict_id` bigint(20) NULL DEFAULT NULL,
  `dict_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dict_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, '用户性别', 'sys_user_sex', '0', 'admin', '2023-03-27', NULL, NULL, '用户性别列表');
INSERT INTO `sys_dict_type` VALUES (2, '菜单状态', 'sys_show_hide', '0', 'admin', '2023-03-27', NULL, NULL, '菜单状态列表');
INSERT INTO `sys_dict_type` VALUES (3, '系统开关', 'sys_normal_disable', '0', 'admin', '2023-03-27', NULL, NULL, '系统开关列表');
INSERT INTO `sys_dict_type` VALUES (4, '任务状态', 'sys_job_status', '0', 'admin', '2023-03-27', NULL, NULL, '任务状态列表');
INSERT INTO `sys_dict_type` VALUES (5, '任务分组', 'sys_job_group', '0', 'admin', '2023-03-27', NULL, NULL, '任务分组列表');
INSERT INTO `sys_dict_type` VALUES (6, '系统是否', 'sys_yes_no', '0', 'admin', '2023-03-27', NULL, NULL, '系统是否列表');
INSERT INTO `sys_dict_type` VALUES (7, '通知类型', 'sys_notice_type', '0', 'admin', '2023-03-27', NULL, NULL, '通知类型列表');
INSERT INTO `sys_dict_type` VALUES (8, '通知状态', 'sys_notice_status', '0', 'admin', '2023-03-27', NULL, NULL, '通知状态列表');
INSERT INTO `sys_dict_type` VALUES (9, '操作类型', 'sys_oper_type', '0', 'admin', '2023-03-27', NULL, NULL, '操作类型列表');
INSERT INTO `sys_dict_type` VALUES (10, '系统状态', 'sys_common_status', '0', 'admin', '2023-03-27', NULL, NULL, '登录状态列表');
INSERT INTO `sys_dict_type` VALUES (11, '订单交易类型', 'payment_type', '0', 'admin', '2024-11-11', 'admin', '2024-11-11', '订单交易类型');
INSERT INTO `sys_dict_type` VALUES (13, '钱包类型', 'wallet_type_dic', '0', 'admin', '2024-11-19', NULL, NULL, '钱包类型');
INSERT INTO `sys_dict_type` VALUES (14, '游戏类型', 'game_type', '0', 'admin', '2024-11-20', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_job
-- ----------------------------
DROP TABLE IF EXISTS `sys_job`;
CREATE TABLE `sys_job`  (
  `job_id` bigint(20) NULL DEFAULT NULL,
  `job_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_group` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `invoke_targ` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cron_expres` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `misfire_pol` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `concurrent` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_job
-- ----------------------------
INSERT INTO `sys_job` VALUES (1, '系统默认（无参）', 'DEFAULT', 'ryTask.ryNoParams', '0/10 * * * * ?', '3', '1', '1', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_job` VALUES (2, '系统默认（有参）', 'DEFAULT', 'ryTask.ryParams(\'ry\')', '0/15 * * * * ?', '3', '1', '1', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_job` VALUES (3, '系统默认（多参）', 'DEFAULT', 'ryTask.ryMultipleParams(\'ry\', true, 2000L, 316.50D, 100)', '0/20 * * * * ?', '3', '1', '1', 'admin', '2023-03-27', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_job_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_job_log`;
CREATE TABLE `sys_job_log`  (
  `job_log_id` bigint(20) NULL DEFAULT NULL,
  `job_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_group` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `invoke_targ` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `job_message` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `exception_i` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_job_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_logininfor
-- ----------------------------
DROP TABLE IF EXISTS `sys_logininfor`;
CREATE TABLE `sys_logininfor`  (
  `info_id` bigint(20) NULL DEFAULT NULL,
  `user_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ipaddr` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_locat` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `browser` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `os` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `msg` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_time` date NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_logininfor
-- ----------------------------
INSERT INTO `sys_logininfor` VALUES (100, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (101, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (102, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (103, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (104, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (105, 'ry', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (106, 'ry', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (107, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-27');
INSERT INTO `sys_logininfor` VALUES (108, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (109, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (110, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (111, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (112, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (113, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (114, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (115, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (116, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (117, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (118, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '密码输入错误1次', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (119, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (120, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (121, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (122, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (123, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '密码输入错误1次', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (124, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (125, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (126, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (127, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (128, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (129, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '密码输入错误1次', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (130, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (131, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (132, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-28');
INSERT INTO `sys_logininfor` VALUES (133, 'admin', '117.188.244.72', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误1次', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (134, 'admin', '117.188.244.72', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (135, 'admin', '117.188.244.72', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (136, 'admin', '117.188.244.72', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (137, 'ruoyi', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '登录用户：ruoyi 不存在', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (138, 'ry', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (139, 'ry', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (140, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (141, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '密码输入错误1次', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (142, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (143, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (144, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (145, 'admin', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (146, '18282379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (147, '18282379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：18282379398 不存在', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (148, '18285379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (149, 'wangtao', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (150, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (151, 'wangtao', '117.188.249.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (152, 'wangtao', '117.188.249.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (153, '18285379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (154, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (155, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (156, 'admin', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误1次', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (157, 'admin', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (158, '18285379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (159, '18285379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (160, '18285379398', '1.48.65.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-29');
INSERT INTO `sys_logininfor` VALUES (161, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (162, '18285379398', '1.48.80.209', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (163, '18285379398', '114.138.156.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (164, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (165, '18285379398', '114.138.156.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (166, '18285379398', '114.138.156.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (167, '18285379398', '114.138.156.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (168, '18285379398', '114.138.156.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-30');
INSERT INTO `sys_logininfor` VALUES (169, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (170, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (171, '18285379398', '1.48.211.211', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (172, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误1次', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (173, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (174, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (175, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (176, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (177, '18285379398', '1.48.211.211', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (178, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (179, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '1', '密码输入错误1次', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (180, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (181, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-03-31');
INSERT INTO `sys_logininfor` VALUES (182, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (183, 'chengmiao', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (184, 'chengmiao', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (185, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (186, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (187, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (188, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (189, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (190, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (191, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (192, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (193, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (194, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (195, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (196, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (197, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (198, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (199, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (200, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (201, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (202, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (203, 'wangtao', '117.188.245.136', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (204, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (205, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (206, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (207, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (208, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (209, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (210, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (211, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (212, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (213, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (214, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (215, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (216, 'wangpeng', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：wangpeng 不存在', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (217, '18285379398', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (218, '18285379398', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (219, '18285379398', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (220, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (221, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (222, 'chengmiao', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (223, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (224, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (225, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (226, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (227, 'chengmiao', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (228, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (229, 'wangtao', '39.144.228.210', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (230, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (231, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (232, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (233, 'chengmiao', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (234, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (235, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (236, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (237, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (238, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (239, '18285379398', '1.48.204.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (240, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-01');
INSERT INTO `sys_logininfor` VALUES (241, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (242, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (243, 'admin', '112.96.70.205', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (244, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (245, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (246, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (247, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (248, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (249, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (250, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (251, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (252, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (253, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (254, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (255, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (256, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (257, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (258, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (259, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (260, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (261, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (262, '18285379398', '1.48.108.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (263, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (264, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (265, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (266, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-02');
INSERT INTO `sys_logininfor` VALUES (267, '18285379398', '1.49.114.147', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (268, '18285379398', '1.49.114.147', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (269, 'admin', '61.28.108.103', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (270, 'admin', '61.28.108.103', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (271, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (272, 'admin', '61.28.108.103', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (273, 'chengmiao', '61.28.108.103', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (274, 'admin', '61.28.108.103', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-03');
INSERT INTO `sys_logininfor` VALUES (275, 'admin', '61.28.108.103', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-04');
INSERT INTO `sys_logininfor` VALUES (276, 'admin', '61.28.108.103', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-04');
INSERT INTO `sys_logininfor` VALUES (277, '18285379398', '1.49.114.66', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (278, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (279, '18285379398', '103.242.215.62', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (280, '18285379398', '103.242.215.62', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (281, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (282, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (283, '18285379398', '39.144.228.229', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (284, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (285, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (286, 'wangtao', '117.188.255.89', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (287, 'chengmiao', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (288, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (289, 'chengmiao', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (290, 'chengmiao', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (291, '18285379398', '1.206.133.128', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (292, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (293, '18285379398', '114.138.180.154', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-05');
INSERT INTO `sys_logininfor` VALUES (294, '18285379398', '1.49.177.165', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (295, '18285379398', '1.49.177.165', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (296, '18285379398', '1.49.177.165', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (297, '18285379398', '1.49.177.165', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (298, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (299, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (300, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-06');
INSERT INTO `sys_logininfor` VALUES (301, '18285379398', '220.172.73.181', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-07');
INSERT INTO `sys_logininfor` VALUES (302, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-07');
INSERT INTO `sys_logininfor` VALUES (303, '18285379398', '1.49.120.54', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-07');
INSERT INTO `sys_logininfor` VALUES (304, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-07');
INSERT INTO `sys_logininfor` VALUES (305, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-07');
INSERT INTO `sys_logininfor` VALUES (306, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (307, '18285379398', '1.49.120.54', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (308, '18285379398', '1.49.120.54', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (309, '18285379398', '1.49.120.54', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (310, '18285379398', '1.48.65.70', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (311, '18285379398', '1.206.142.187', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (312, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (313, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (314, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (315, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (316, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (317, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (318, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (319, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (320, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (321, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (322, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (323, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (324, '18285379398', '1.48.109.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-08');
INSERT INTO `sys_logininfor` VALUES (325, '18285379398', '114.139.119.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (326, '18285379398', '114.139.119.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (327, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (328, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (329, '18285379398', '114.138.158.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (330, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (331, 'admin', '61.28.108.105', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (332, '18285379398', '114.138.158.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (333, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (334, '18285379398', '114.138.158.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (335, '18285379398', '114.138.158.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (336, '18285379398', '114.138.158.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-09');
INSERT INTO `sys_logininfor` VALUES (337, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (338, 'admin', '61.28.108.105', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (339, '18285379398', '1.48.193.197', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (340, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (341, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (342, 'admin', '61.28.108.105', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (343, '18285379398', '114.139.98.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (344, '18285379398', '114.139.98.254', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-10');
INSERT INTO `sys_logininfor` VALUES (345, '16687631643', '116.162.93.133', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (346, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (347, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (348, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (349, '18285379398', '114.138.154.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (350, 'admin', '45.62.169.187', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-11');
INSERT INTO `sys_logininfor` VALUES (351, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (352, '18285379398', '1.49.176.19', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (353, '18285379398', '1.49.176.19', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (354, '18285379398', '1.206.161.182', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (355, '18285379398', '1.48.115.192', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (356, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-12');
INSERT INTO `sys_logininfor` VALUES (357, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (358, 'admin', '61.28.108.106', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (359, 'admin', '61.28.108.106', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (360, '18285379398', '1.206.136.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (361, 'admin', '61.28.108.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (362, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (363, '18285379398', '114.139.115.233', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (364, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-13');
INSERT INTO `sys_logininfor` VALUES (365, 'admin', '119.131.229.171', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (366, '18285379398', '114.139.115.233', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (367, '16687631643', '120.228.198.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (368, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (369, 'admin', '61.28.108.104', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (370, '18285379398', '1.48.92.157', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-14');
INSERT INTO `sys_logininfor` VALUES (371, '18285379398', '114.138.131.9', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-15');
INSERT INTO `sys_logininfor` VALUES (372, '18285379398', '114.138.131.9', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-15');
INSERT INTO `sys_logininfor` VALUES (373, '18285379398', '114.138.131.9', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-15');
INSERT INTO `sys_logininfor` VALUES (374, '16687631643', '120.228.199.176', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-15');
INSERT INTO `sys_logininfor` VALUES (375, '18285379398', '114.138.131.9', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-15');
INSERT INTO `sys_logininfor` VALUES (376, '18285379398', '114.139.114.189', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (377, '16687631643', '120.228.198.225', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (378, '16687631643', '120.228.198.225', 'XX XX', 'Chrome 9', 'Windows 10', '1', '验证码错误', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (379, '16687631643', '120.228.198.225', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (380, '16687631643', '120.228.198.225', 'XX XX', 'Chrome 9', 'Windows 10', '1', '验证码错误', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (381, '16687631643', '120.228.198.225', 'XX XX', 'Chrome 9', 'Windows 10', '0', '登录成功', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (382, '16687631643', '120.228.198.225', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (383, '18285379398', '114.139.114.189', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-16');
INSERT INTO `sys_logininfor` VALUES (384, '16687631643', '120.228.198.225', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-17');
INSERT INTO `sys_logininfor` VALUES (385, '18285379398', '1.206.143.214', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2023-04-18');
INSERT INTO `sys_logininfor` VALUES (386, '18285379398', '1.206.143.214', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-18');
INSERT INTO `sys_logininfor` VALUES (387, '18285379398', '1.206.162.219', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-19');
INSERT INTO `sys_logininfor` VALUES (388, '18285379398', '1.48.125.11', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-20');
INSERT INTO `sys_logininfor` VALUES (389, '18285379398', '1.206.161.112', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-21');
INSERT INTO `sys_logininfor` VALUES (390, '18285379398', '220.172.68.102', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-21');
INSERT INTO `sys_logininfor` VALUES (391, '16687631643', '120.228.198.225', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-21');
INSERT INTO `sys_logininfor` VALUES (392, '18285379398', '1.48.120.81', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-21');
INSERT INTO `sys_logininfor` VALUES (393, 'admin', '61.28.108.105', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (394, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (395, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (396, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (397, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (398, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (399, 'admin', '112.96.115.104', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (400, '18285379398', '1.49.122.79', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-22');
INSERT INTO `sys_logininfor` VALUES (401, 'admin', '61.28.108.105', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-23');
INSERT INTO `sys_logininfor` VALUES (402, '18285379398', '1.49.165.176', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-23');
INSERT INTO `sys_logininfor` VALUES (403, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (404, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (405, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (406, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误1次', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (407, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (408, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (409, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (410, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (411, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (412, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误2次', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (413, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (414, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误3次', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (415, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (416, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误4次', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (417, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (418, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (419, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (420, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (421, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (422, '18285379398', '114.138.142.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-24');
INSERT INTO `sys_logininfor` VALUES (423, '18285379398', '114.135.19.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-25');
INSERT INTO `sys_logininfor` VALUES (424, '18285379398', '1.206.158.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-25');
INSERT INTO `sys_logininfor` VALUES (425, '18285379398', '1.206.158.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-26');
INSERT INTO `sys_logininfor` VALUES (426, '18285379398', '114.138.157.186', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-26');
INSERT INTO `sys_logininfor` VALUES (427, '18285379398', '114.138.157.186', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-26');
INSERT INTO `sys_logininfor` VALUES (428, '18285379398', '1.49.98.214', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-27');
INSERT INTO `sys_logininfor` VALUES (429, 'admin', '61.28.108.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-27');
INSERT INTO `sys_logininfor` VALUES (430, '18285379398', '114.139.115.5', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-29');
INSERT INTO `sys_logininfor` VALUES (431, '18285379398', '114.139.115.5', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-29');
INSERT INTO `sys_logininfor` VALUES (432, '18285379398', '103.242.215.179', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-29');
INSERT INTO `sys_logininfor` VALUES (433, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-04-29');
INSERT INTO `sys_logininfor` VALUES (434, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-04-29');
INSERT INTO `sys_logininfor` VALUES (435, '18285379398', '103.242.215.179', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-04-30');
INSERT INTO `sys_logininfor` VALUES (436, 'admin', '117.181.72.147', 'XX XX', 'Chrome 10', 'Windows 10', '0', '登录成功', '2023-04-30');
INSERT INTO `sys_logininfor` VALUES (437, 'admin', '117.181.72.147', 'XX XX', 'Chrome 10', 'Windows 10', '0', '登录成功', '2023-05-01');
INSERT INTO `sys_logininfor` VALUES (438, '18285379398', '1.48.89.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-01');
INSERT INTO `sys_logininfor` VALUES (439, '18285379398', '1.48.89.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-01');
INSERT INTO `sys_logininfor` VALUES (440, '18285379398', '1.48.89.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-01');
INSERT INTO `sys_logininfor` VALUES (441, '18285379398', '103.242.215.179', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-02');
INSERT INTO `sys_logininfor` VALUES (442, 'admin', '117.181.72.147', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2023-05-03');
INSERT INTO `sys_logininfor` VALUES (443, 'admin', '117.181.72.147', 'XX XX', 'Chrome 10', 'Windows 10', '0', '登录成功', '2023-05-03');
INSERT INTO `sys_logininfor` VALUES (444, '18285379398', '1.206.142.173', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-05');
INSERT INTO `sys_logininfor` VALUES (445, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-05');
INSERT INTO `sys_logininfor` VALUES (446, '18285379398', '1.48.119.66', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-05');
INSERT INTO `sys_logininfor` VALUES (447, 'admin', '117.140.112.224', 'XX XX', 'Chrome 10', 'Windows 10', '0', '登录成功', '2023-05-05');
INSERT INTO `sys_logininfor` VALUES (448, '18285379398', '220.172.70.184', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-06');
INSERT INTO `sys_logininfor` VALUES (449, '18285379398', '1.48.109.178', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-06');
INSERT INTO `sys_logininfor` VALUES (450, '18285379398', '1.48.109.178', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-06');
INSERT INTO `sys_logininfor` VALUES (451, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-09');
INSERT INTO `sys_logininfor` VALUES (452, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-09');
INSERT INTO `sys_logininfor` VALUES (453, '18285379398', '114.138.150.52', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-10');
INSERT INTO `sys_logininfor` VALUES (454, '3354924548', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：3354924548 不存在', '2023-05-11');
INSERT INTO `sys_logininfor` VALUES (455, '3354924548', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-11');
INSERT INTO `sys_logininfor` VALUES (456, '3354924548', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：3354924548 不存在', '2023-05-11');
INSERT INTO `sys_logininfor` VALUES (457, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-11');
INSERT INTO `sys_logininfor` VALUES (458, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-11');
INSERT INTO `sys_logininfor` VALUES (459, '18285379398', '114.135.17.230', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-12');
INSERT INTO `sys_logininfor` VALUES (460, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-12');
INSERT INTO `sys_logininfor` VALUES (461, '18285379398', '114.135.17.230', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-12');
INSERT INTO `sys_logininfor` VALUES (462, '18285379398', '1.49.178.247', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-13');
INSERT INTO `sys_logininfor` VALUES (463, '18285379398', '1.49.178.247', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-13');
INSERT INTO `sys_logininfor` VALUES (464, '18285379398', '1.49.178.247', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-13');
INSERT INTO `sys_logininfor` VALUES (465, '18285379398', '1.49.178.247', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-14');
INSERT INTO `sys_logininfor` VALUES (466, '18285379398', '1.49.178.247', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-15');
INSERT INTO `sys_logininfor` VALUES (467, '18285379398', '1.49.112.215', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-15');
INSERT INTO `sys_logininfor` VALUES (468, '16687631643', '223.148.143.231', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-15');
INSERT INTO `sys_logininfor` VALUES (469, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-16');
INSERT INTO `sys_logininfor` VALUES (470, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-17');
INSERT INTO `sys_logininfor` VALUES (471, '18285379398', '1.49.176.157', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-17');
INSERT INTO `sys_logininfor` VALUES (472, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-17');
INSERT INTO `sys_logininfor` VALUES (473, '18285379398', '1.49.176.157', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-17');
INSERT INTO `sys_logininfor` VALUES (474, '18285379398', '1.49.176.157', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-17');
INSERT INTO `sys_logininfor` VALUES (475, '16687631643', '120.228.199.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-18');
INSERT INTO `sys_logininfor` VALUES (476, '18285379398', '1.49.176.157', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-18');
INSERT INTO `sys_logininfor` VALUES (477, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (478, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (479, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (480, '16687631643', '120.228.199.17', 'XX XX', 'Chrome 9', 'Windows 10', '0', '登录成功', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (481, 'admin', '61.28.108.82', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (482, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-19');
INSERT INTO `sys_logininfor` VALUES (483, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (484, '18285379398', '1.49.100.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (485, '18285379398', '1.206.148.244', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (486, '18285379398', '1.206.148.244', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (487, '18285379398', '1.206.148.244', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (488, '18285379398', '1.206.148.244', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-20');
INSERT INTO `sys_logininfor` VALUES (489, '18285379398', '1.206.148.244', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (490, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (491, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (492, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (493, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (494, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (495, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (496, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (497, '18285379398', '1.49.173.46', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-21');
INSERT INTO `sys_logininfor` VALUES (498, '18285379398', '1.206.134.154', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-22');
INSERT INTO `sys_logininfor` VALUES (499, '18285379398', '114.138.145.30', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-23');
INSERT INTO `sys_logininfor` VALUES (500, '18285379398', '114.138.146.62', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-23');
INSERT INTO `sys_logininfor` VALUES (501, '18285379398', '1.48.200.229', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-24');
INSERT INTO `sys_logininfor` VALUES (502, '18285379398', '114.139.106.209', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-25');
INSERT INTO `sys_logininfor` VALUES (503, '18285379398', '114.139.106.196', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-25');
INSERT INTO `sys_logininfor` VALUES (504, '18285379398', '1.49.160.128', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-26');
INSERT INTO `sys_logininfor` VALUES (505, '18285379398', '1.48.70.183', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-26');
INSERT INTO `sys_logininfor` VALUES (506, '18285379398', '1.49.114.185', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-27');
INSERT INTO `sys_logininfor` VALUES (507, '18285379398', '1.206.134.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-27');
INSERT INTO `sys_logininfor` VALUES (508, '18285379398', '1.206.134.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-27');
INSERT INTO `sys_logininfor` VALUES (509, '18285379398', '1.206.142.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-27');
INSERT INTO `sys_logininfor` VALUES (510, '18285379398', '1.206.142.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-27');
INSERT INTO `sys_logininfor` VALUES (511, '18285379398', '114.138.161.0', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-28');
INSERT INTO `sys_logininfor` VALUES (512, '18285379398', '1.48.200.82', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-29');
INSERT INTO `sys_logininfor` VALUES (513, '18285379398', '1.206.156.208', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-29');
INSERT INTO `sys_logininfor` VALUES (514, '18285379398', '1.49.161.111', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-29');
INSERT INTO `sys_logininfor` VALUES (515, '18285379398', '1.48.93.224', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-30');
INSERT INTO `sys_logininfor` VALUES (516, '18285379398', '1.48.94.152', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-31');
INSERT INTO `sys_logininfor` VALUES (517, '18285379398', '114.139.101.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-05-31');
INSERT INTO `sys_logininfor` VALUES (518, '18285379398', '114.138.160.200', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-01');
INSERT INTO `sys_logininfor` VALUES (519, '18285379398', '114.139.105.193', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-01');
INSERT INTO `sys_logininfor` VALUES (520, '18285379398', '1.48.201.29', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-01');
INSERT INTO `sys_logininfor` VALUES (521, '18285379398', '1.49.108.40', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (522, 'wzt758', '117.188.254.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：wzt758 不存在', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (523, 'wangzhangtao', '117.188.254.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '登录用户：wangzhangtao 不存在', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (524, 'wangtao', '117.188.254.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (525, 'wangtao', '117.188.254.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (526, 'wangtao', '117.188.254.36', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (527, '18285379398', '1.206.144.11', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-02');
INSERT INTO `sys_logininfor` VALUES (528, '18285379398', '1.49.108.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-03');
INSERT INTO `sys_logininfor` VALUES (529, '18285379398', '1.49.108.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-03');
INSERT INTO `sys_logininfor` VALUES (530, '18285379398', '1.49.108.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-03');
INSERT INTO `sys_logininfor` VALUES (531, '18285379398', '1.49.165.206', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-04');
INSERT INTO `sys_logininfor` VALUES (532, '18285379398', '1.49.165.206', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-04');
INSERT INTO `sys_logininfor` VALUES (533, '18285379398', '114.138.148.165', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-05');
INSERT INTO `sys_logininfor` VALUES (534, '18285379398', '114.138.147.6', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-06');
INSERT INTO `sys_logininfor` VALUES (535, '18285379398', '114.138.145.187', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-06');
INSERT INTO `sys_logininfor` VALUES (536, '18285379398', '1.48.192.245', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-06');
INSERT INTO `sys_logininfor` VALUES (537, 'wangtao', '117.188.255.119', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-07');
INSERT INTO `sys_logininfor` VALUES (538, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (539, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '退出成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (540, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (541, 'wangtao', '117.188.245.172', 'XX XX', 'Chrome 11', 'Mac OS X', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (542, 'wangtao', '39.144.230.18', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (543, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '退出成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (544, '18285379398', '114.139.96.90', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (545, '18285379398', '1.48.74.196', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-08');
INSERT INTO `sys_logininfor` VALUES (546, '18285379398', '1.48.74.196', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-09');
INSERT INTO `sys_logininfor` VALUES (547, '18285379398', '114.138.158.78', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-09');
INSERT INTO `sys_logininfor` VALUES (548, '18285379398', '1.49.97.62', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-10');
INSERT INTO `sys_logininfor` VALUES (549, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-10');
INSERT INTO `sys_logininfor` VALUES (550, '18285379398', '1.206.156.64', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-10');
INSERT INTO `sys_logininfor` VALUES (551, '18285379398', '114.139.113.125', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-11');
INSERT INTO `sys_logininfor` VALUES (552, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-12');
INSERT INTO `sys_logininfor` VALUES (553, '18285379398', '1.48.208.249', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-13');
INSERT INTO `sys_logininfor` VALUES (554, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (555, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '退出成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (556, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码已失效', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (557, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (558, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '退出成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (559, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (560, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '退出成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (561, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码已失效', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (562, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 8', 'Windows 10', '0', '登录成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (563, '18285379398', '1.49.161.94', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-14');
INSERT INTO `sys_logininfor` VALUES (564, '18285379398', '1.48.68.49', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-15');
INSERT INTO `sys_logininfor` VALUES (565, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-06-15');
INSERT INTO `sys_logininfor` VALUES (566, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-06-15');
INSERT INTO `sys_logininfor` VALUES (567, 'wangtao', '117.187.32.108', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-06-15');
INSERT INTO `sys_logininfor` VALUES (568, '18285379398', '1.206.145.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-16');
INSERT INTO `sys_logininfor` VALUES (569, '18285379398', '1.206.157.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-17');
INSERT INTO `sys_logininfor` VALUES (570, '18285379398', '1.206.157.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-17');
INSERT INTO `sys_logininfor` VALUES (571, '18285379398', '1.49.172.56', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-18');
INSERT INTO `sys_logininfor` VALUES (572, '18285379398', '1.48.206.240', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-18');
INSERT INTO `sys_logininfor` VALUES (573, '18285379398', '114.139.109.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-19');
INSERT INTO `sys_logininfor` VALUES (574, 'admin', '113.111.42.148', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-06-19');
INSERT INTO `sys_logininfor` VALUES (575, '18285379398', '1.49.102.211', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-19');
INSERT INTO `sys_logininfor` VALUES (576, 'wangtao', '117.188.246.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-20');
INSERT INTO `sys_logininfor` VALUES (577, '18285379398', '111.121.59.207', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-21');
INSERT INTO `sys_logininfor` VALUES (578, '18285379398', '111.121.59.207', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-22');
INSERT INTO `sys_logininfor` VALUES (579, '18285379398', '1.206.148.39', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-22');
INSERT INTO `sys_logininfor` VALUES (580, '18285379398', '114.138.146.210', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-23');
INSERT INTO `sys_logininfor` VALUES (581, '18285379398', '114.138.146.210', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-23');
INSERT INTO `sys_logininfor` VALUES (582, 'admin', '113.109.180.208', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-06-23');
INSERT INTO `sys_logininfor` VALUES (583, 'admin', '183.48.88.41', 'XX XX', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-06-25');
INSERT INTO `sys_logininfor` VALUES (584, '18285379398', '114.139.109.110', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-25');
INSERT INTO `sys_logininfor` VALUES (585, '18285379398', '1.48.196.192', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-26');
INSERT INTO `sys_logininfor` VALUES (586, '18285379398', '1.48.72.218', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-27');
INSERT INTO `sys_logininfor` VALUES (587, '18285379398', '1.48.206.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-06-28');
INSERT INTO `sys_logininfor` VALUES (588, '18285379398', '1.48.206.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2023-06-28');
INSERT INTO `sys_logininfor` VALUES (589, '18285379398', '1.48.206.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-28');
INSERT INTO `sys_logininfor` VALUES (590, '18285379398', '1.49.114.235', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-29');
INSERT INTO `sys_logininfor` VALUES (591, '18285379398', '1.49.161.83', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-06-29');
INSERT INTO `sys_logininfor` VALUES (592, '18285379398', '1.49.114.70', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-01');
INSERT INTO `sys_logininfor` VALUES (593, '18285379398', '114.138.134.153', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-07-01');
INSERT INTO `sys_logininfor` VALUES (594, '18285379398', '114.138.134.153', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-01');
INSERT INTO `sys_logininfor` VALUES (595, '18285379398', '1.48.66.166', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-04');
INSERT INTO `sys_logininfor` VALUES (596, '18285379398', '114.138.129.130', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-05');
INSERT INTO `sys_logininfor` VALUES (597, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-05');
INSERT INTO `sys_logininfor` VALUES (598, '18285379398', '1.206.161.183', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-05');
INSERT INTO `sys_logininfor` VALUES (599, '18285379398', '114.138.183.65', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-06');
INSERT INTO `sys_logininfor` VALUES (600, '18285379398', '114.138.183.65', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-06');
INSERT INTO `sys_logininfor` VALUES (601, '18285379398', '1.49.114.248', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-07');
INSERT INTO `sys_logininfor` VALUES (602, '18285379398', '1.206.166.113', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-07');
INSERT INTO `sys_logininfor` VALUES (603, '18285379398', '1.49.181.108', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-07');
INSERT INTO `sys_logininfor` VALUES (604, '18285379398', '1.48.76.150', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-08');
INSERT INTO `sys_logininfor` VALUES (605, '18285379398', '114.139.106.220', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-10');
INSERT INTO `sys_logininfor` VALUES (606, '18285379398', '114.138.142.237', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-11');
INSERT INTO `sys_logininfor` VALUES (607, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-11');
INSERT INTO `sys_logininfor` VALUES (608, '18285379398', '1.48.76.92', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-11');
INSERT INTO `sys_logininfor` VALUES (609, '18285379398', '114.138.141.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-12');
INSERT INTO `sys_logininfor` VALUES (610, '18285379398', '114.138.141.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-13');
INSERT INTO `sys_logininfor` VALUES (611, '18285379398', '114.138.141.86', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-13');
INSERT INTO `sys_logininfor` VALUES (612, '18285379398', '1.206.138.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-07-13');
INSERT INTO `sys_logininfor` VALUES (613, '18285379398', '1.206.138.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-13');
INSERT INTO `sys_logininfor` VALUES (614, '18285379398', '1.206.138.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-13');
INSERT INTO `sys_logininfor` VALUES (615, '18285379398', '1.49.168.154', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-14');
INSERT INTO `sys_logininfor` VALUES (616, '18285379398', '114.135.27.241', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-14');
INSERT INTO `sys_logininfor` VALUES (617, '18285379398', '114.135.27.241', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-15');
INSERT INTO `sys_logininfor` VALUES (618, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-15');
INSERT INTO `sys_logininfor` VALUES (619, '18285379398', '114.135.27.241', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-15');
INSERT INTO `sys_logininfor` VALUES (620, '18285379398', '114.135.27.241', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-16');
INSERT INTO `sys_logininfor` VALUES (621, '18285379398', '114.135.27.241', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-16');
INSERT INTO `sys_logininfor` VALUES (622, '18285379398', '114.138.161.121', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-17');
INSERT INTO `sys_logininfor` VALUES (623, '18285379398', '1.206.161.72', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-18');
INSERT INTO `sys_logininfor` VALUES (624, '18285379398', '1.48.202.11', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-19');
INSERT INTO `sys_logininfor` VALUES (625, '18285379398', '114.135.18.83', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-19');
INSERT INTO `sys_logininfor` VALUES (626, '18285379398', '114.135.18.83', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-19');
INSERT INTO `sys_logininfor` VALUES (627, '18285379398', '1.48.80.76', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-19');
INSERT INTO `sys_logininfor` VALUES (628, '18285379398', '114.138.150.227', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-20');
INSERT INTO `sys_logininfor` VALUES (629, '18285379398', '1.49.120.13', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-20');
INSERT INTO `sys_logininfor` VALUES (630, '18285379398', '1.49.120.13', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-20');
INSERT INTO `sys_logininfor` VALUES (631, '18285379398', '1.48.194.147', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-21');
INSERT INTO `sys_logininfor` VALUES (632, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-21');
INSERT INTO `sys_logininfor` VALUES (633, '18285379398', '1.49.108.4', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-21');
INSERT INTO `sys_logininfor` VALUES (634, '18285379398', '1.48.70.245', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-22');
INSERT INTO `sys_logininfor` VALUES (635, '18285379398', '114.135.20.33', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-22');
INSERT INTO `sys_logininfor` VALUES (636, '18285379398', '114.135.25.251', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-23');
INSERT INTO `sys_logininfor` VALUES (637, '18285379398', '1.49.169.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-24');
INSERT INTO `sys_logininfor` VALUES (638, '18285379398', '114.135.18.187', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-24');
INSERT INTO `sys_logininfor` VALUES (639, '18285379398', '1.206.175.35', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-24');
INSERT INTO `sys_logininfor` VALUES (640, '18285379398', '1.48.210.237', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-25');
INSERT INTO `sys_logininfor` VALUES (641, '18285379398', '114.138.129.110', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-25');
INSERT INTO `sys_logininfor` VALUES (642, '18285379398', '1.49.177.114', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-26');
INSERT INTO `sys_logininfor` VALUES (643, '18285379398', '1.204.91.194', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-26');
INSERT INTO `sys_logininfor` VALUES (644, '18285379398', '1.206.145.122', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-27');
INSERT INTO `sys_logininfor` VALUES (645, '18285379398', '222.85.217.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-27');
INSERT INTO `sys_logininfor` VALUES (646, '18285379398', '114.135.23.167', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-27');
INSERT INTO `sys_logininfor` VALUES (647, '18285379398', '1.206.183.174', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-28');
INSERT INTO `sys_logininfor` VALUES (648, '18285379398', '114.138.170.59', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-29');
INSERT INTO `sys_logininfor` VALUES (649, '18285379398', '1.206.182.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-29');
INSERT INTO `sys_logininfor` VALUES (650, '18285379398', '1.206.182.17', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-29');
INSERT INTO `sys_logininfor` VALUES (651, '18285379398', '1.48.212.188', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-30');
INSERT INTO `sys_logininfor` VALUES (652, '18285379398', '114.138.160.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-07-31');
INSERT INTO `sys_logininfor` VALUES (653, '18285379398', '114.138.160.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-07-31');
INSERT INTO `sys_logininfor` VALUES (654, '18285379398', '114.138.160.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2023-07-31');
INSERT INTO `sys_logininfor` VALUES (655, '18285379398', '114.138.160.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-31');
INSERT INTO `sys_logininfor` VALUES (656, '18285379398', '114.138.160.43', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-07-31');
INSERT INTO `sys_logininfor` VALUES (657, '18285379398', '114.138.129.41', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-01');
INSERT INTO `sys_logininfor` VALUES (658, '18285379398', '114.138.129.41', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-01');
INSERT INTO `sys_logininfor` VALUES (659, '18285379398', '1.48.74.31', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-02');
INSERT INTO `sys_logininfor` VALUES (660, '18285379398', '1.48.192.114', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-02');
INSERT INTO `sys_logininfor` VALUES (661, '18285379398', '1.48.223.132', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-03');
INSERT INTO `sys_logininfor` VALUES (662, '18285379398', '1.48.223.132', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-03');
INSERT INTO `sys_logininfor` VALUES (663, '18285379398', '1.206.158.148', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-04');
INSERT INTO `sys_logininfor` VALUES (664, '18285379398', '1.206.158.148', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-05');
INSERT INTO `sys_logininfor` VALUES (665, '18285379398', '1.206.133.230', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-05');
INSERT INTO `sys_logininfor` VALUES (666, '18285379398', '114.138.185.41', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2023-08-06');
INSERT INTO `sys_logininfor` VALUES (667, '15338633984', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '登录用户：15338633984 不存在', '2023-08-06');
INSERT INTO `sys_logininfor` VALUES (668, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-06');
INSERT INTO `sys_logininfor` VALUES (669, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-07');
INSERT INTO `sys_logininfor` VALUES (670, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-08-07');
INSERT INTO `sys_logininfor` VALUES (671, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-07');
INSERT INTO `sys_logininfor` VALUES (672, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-08');
INSERT INTO `sys_logininfor` VALUES (673, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-08-14');
INSERT INTO `sys_logininfor` VALUES (674, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-08-14');
INSERT INTO `sys_logininfor` VALUES (675, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-14');
INSERT INTO `sys_logininfor` VALUES (676, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-08-16');
INSERT INTO `sys_logininfor` VALUES (677, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (678, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (679, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (680, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (681, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (682, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-07');
INSERT INTO `sys_logininfor` VALUES (683, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (684, 'admin', '192.168.31.214', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (685, 'admin', '192.168.31.214', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (686, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (687, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (688, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (689, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (690, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (691, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (692, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (693, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (694, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-18');
INSERT INTO `sys_logininfor` VALUES (695, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (696, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (697, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (698, 'vip001', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (699, 'vip001', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (700, 'vip001', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (701, 'vip001', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (702, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (703, 'admin', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '0', '退出成功', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (704, 'ruoyi', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '登录用户：ruoyi 不存在', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (705, 'ruoyi', '127.0.0.1', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2023-09-19');
INSERT INTO `sys_logininfor` VALUES (706, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-20');
INSERT INTO `sys_logininfor` VALUES (707, 'admin', '192.168.31.214', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-20');
INSERT INTO `sys_logininfor` VALUES (708, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-20');
INSERT INTO `sys_logininfor` VALUES (709, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-20');
INSERT INTO `sys_logininfor` VALUES (710, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-20');
INSERT INTO `sys_logininfor` VALUES (711, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (712, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (713, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (714, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (715, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (716, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (717, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (718, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-21');
INSERT INTO `sys_logininfor` VALUES (719, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-22');
INSERT INTO `sys_logininfor` VALUES (720, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-24');
INSERT INTO `sys_logininfor` VALUES (721, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-24');
INSERT INTO `sys_logininfor` VALUES (722, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-02-25');
INSERT INTO `sys_logininfor` VALUES (723, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-25');
INSERT INTO `sys_logininfor` VALUES (724, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (725, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (726, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (727, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (728, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (729, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (730, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (731, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (732, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (733, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (734, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (735, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (736, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (737, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (738, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-26');
INSERT INTO `sys_logininfor` VALUES (739, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (740, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (741, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (742, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (743, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (744, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (745, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (746, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (747, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (748, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-27');
INSERT INTO `sys_logininfor` VALUES (749, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-28');
INSERT INTO `sys_logininfor` VALUES (750, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-28');
INSERT INTO `sys_logininfor` VALUES (751, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-02-28');
INSERT INTO `sys_logininfor` VALUES (752, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-28');
INSERT INTO `sys_logininfor` VALUES (753, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-28');
INSERT INTO `sys_logininfor` VALUES (754, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-29');
INSERT INTO `sys_logininfor` VALUES (755, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-29');
INSERT INTO `sys_logininfor` VALUES (756, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-29');
INSERT INTO `sys_logininfor` VALUES (757, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-02-29');
INSERT INTO `sys_logininfor` VALUES (758, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-01');
INSERT INTO `sys_logininfor` VALUES (759, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-03-06');
INSERT INTO `sys_logininfor` VALUES (760, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-06');
INSERT INTO `sys_logininfor` VALUES (761, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-07');
INSERT INTO `sys_logininfor` VALUES (762, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-07');
INSERT INTO `sys_logininfor` VALUES (763, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-08');
INSERT INTO `sys_logininfor` VALUES (764, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-03-08');
INSERT INTO `sys_logininfor` VALUES (765, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-08');
INSERT INTO `sys_logininfor` VALUES (766, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-03-08');
INSERT INTO `sys_logininfor` VALUES (767, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-03-08');
INSERT INTO `sys_logininfor` VALUES (768, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (769, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (770, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (771, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (772, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (773, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (774, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (775, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (776, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (777, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (778, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (779, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-09');
INSERT INTO `sys_logininfor` VALUES (780, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-10');
INSERT INTO `sys_logininfor` VALUES (781, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-10');
INSERT INTO `sys_logininfor` VALUES (782, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (783, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (784, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (785, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (786, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (787, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (788, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-11');
INSERT INTO `sys_logininfor` VALUES (789, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (790, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (791, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (792, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (793, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (794, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (795, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (796, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (797, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (798, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-12');
INSERT INTO `sys_logininfor` VALUES (799, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (800, 'admin', '192.168.0.110', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (801, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (802, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (803, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (804, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (805, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (806, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (807, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (808, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (809, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (810, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (811, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (812, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (813, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (814, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (815, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (816, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (817, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (818, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (819, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (820, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-13');
INSERT INTO `sys_logininfor` VALUES (821, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (822, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (823, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (824, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (825, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (826, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (827, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (828, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (829, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (830, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (831, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-14');
INSERT INTO `sys_logininfor` VALUES (832, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (833, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (834, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (835, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (836, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (837, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (838, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (839, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (840, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-15');
INSERT INTO `sys_logininfor` VALUES (841, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (842, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (843, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (844, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (845, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (846, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (847, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (848, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (849, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (850, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (851, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (852, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-16');
INSERT INTO `sys_logininfor` VALUES (853, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (854, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (855, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (856, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (857, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (858, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (859, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (860, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (861, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-17');
INSERT INTO `sys_logininfor` VALUES (862, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (863, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (864, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (865, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (866, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (867, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (868, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (869, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (870, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (871, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (872, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (873, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (874, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (875, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-18');
INSERT INTO `sys_logininfor` VALUES (876, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (877, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (878, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (879, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (880, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (881, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (882, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (883, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (884, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (885, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (886, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (887, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (888, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (889, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (890, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-19');
INSERT INTO `sys_logininfor` VALUES (891, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (892, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (893, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (894, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (895, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (896, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (897, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (898, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (899, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (900, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (901, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (902, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (903, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-20');
INSERT INTO `sys_logininfor` VALUES (904, 'admin', '192.168.0.116', '内网IP', 'Chrome 11', 'Windows 10', '0', '登录成功', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (905, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (906, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (907, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (908, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (909, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (910, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (911, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (912, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (913, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-21');
INSERT INTO `sys_logininfor` VALUES (914, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-22');
INSERT INTO `sys_logininfor` VALUES (915, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-22');
INSERT INTO `sys_logininfor` VALUES (916, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-06-22');
INSERT INTO `sys_logininfor` VALUES (917, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (918, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (919, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (920, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (921, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (922, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (923, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-12');
INSERT INTO `sys_logininfor` VALUES (924, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (925, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (926, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (927, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (928, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (929, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (930, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (931, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (932, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (933, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (934, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (935, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (936, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (937, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '退出成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (938, 'dqy', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (939, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (940, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (941, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (942, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (943, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '1', '验证码已失效', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (944, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (945, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-19');
INSERT INTO `sys_logininfor` VALUES (946, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-20');
INSERT INTO `sys_logininfor` VALUES (947, 'admin', '127.0.0.1', '内网IP', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-20');
INSERT INTO `sys_logininfor` VALUES (948, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-23');
INSERT INTO `sys_logininfor` VALUES (949, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-23');
INSERT INTO `sys_logininfor` VALUES (950, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-10-25');
INSERT INTO `sys_logininfor` VALUES (951, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-25');
INSERT INTO `sys_logininfor` VALUES (952, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-25');
INSERT INTO `sys_logininfor` VALUES (953, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-27');
INSERT INTO `sys_logininfor` VALUES (954, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-27');
INSERT INTO `sys_logininfor` VALUES (955, 'admin', '103.228.65.32', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (956, 'admin', '103.228.65.31', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (957, 'admin', '103.228.65.31', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (958, 'admin', '103.228.65.31', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (959, 'admin', '103.228.65.34', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (960, 'daqian', '103.228.65.34', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (961, 'daqian', '103.228.65.34', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (962, 'admin', '103.228.65.34', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (963, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (964, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (965, 'admin', '36.148.177.242', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (966, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (967, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (968, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (969, 'daqian', '2409:8a6a:1c82:8441:c738:8445:f211:559b', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (970, 'admin', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (971, 'daqian', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (972, 'admin', '223.116.36.247', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (973, 'admin', '223.116.36.247', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (974, 'admin', '223.116.36.247', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (975, 'admin', '223.116.36.247', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (976, 'admin', '103.40.79.149', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (977, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (978, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (979, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (980, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (981, 'admin', '117.20.117.54', 'XX XX', 'Safari', 'Mac OS X', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (982, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (983, 'test', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (984, 'noone', '117.20.117.54', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (985, 'test', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (986, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (987, 'admin', '49.7.6.170', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (988, 'admin', '112.102.36.89', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (989, 'admin', '103.231.84.5', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (990, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (991, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (992, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (993, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (994, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (995, 'test', '205.198.122.3', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (996, 'rona', '1.55.165.134', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (997, 'rona', '1.55.165.134', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '退出成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (998, 'daqian', '2001:bc8:17c0:511:1260:4bff:fe95:ba94', '内网IP', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (999, 'hoshimi', '202.190.122.158', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1000, 'daqian', '2001:bc8:17c0:511:1260:4bff:fe95:ba94', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1001, 'hoshimi', '202.190.122.158', 'XX XX', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1002, 'niujs', '117.20.117.54', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1003, 'niujs', '117.20.117.54', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1004, 'daqian123', '51.158.206.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1005, 'daqian', '51.158.206.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1006, 'daqian', '51.158.206.14', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1007, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1008, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1009, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1010, 'admin', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1011, 'daqian', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-28');
INSERT INTO `sys_logininfor` VALUES (1012, 'admin', '98.98.195.251', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1013, 'daqian', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1014, 'daqian', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1015, 'daqian', '123.139.54.15', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1016, 'admin', '182.239.115.128', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1017, 'nanfeng', '182.239.115.128', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1018, 'nanfeng', '182.239.87.65', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1019, 'lantian', '203.160.80.119', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1020, 'admin', '222.240.115.9', 'XX XX', 'Chrome 8', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1021, 'admin', '103.97.2.80', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1022, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1023, 'admin', '101.44.82.217', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1024, 'noone', '117.20.117.54', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1025, 'admin', '120.87.231.166', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-29');
INSERT INTO `sys_logininfor` VALUES (1026, 'admin', '103.140.136.117', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1027, 'daqian', '123.139.53.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1028, 'admin', '14.153.147.177', 'XX XX', 'Chrome 8', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1029, 'admin', '14.153.147.177', 'XX XX', 'Chrome 8', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1030, 'admin', '14.153.147.177', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1031, 'admin', '14.153.147.177', 'XX XX', 'Chrome 8', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1032, 'admin', '111.60.136.151', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1033, 'admin', '111.60.136.151', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1034, 'admin', '111.60.136.151', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1035, 'daqian', '123.139.53.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1036, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1037, 'admin', '103.43.162.203', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1038, 'daqian', '123.139.53.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1039, 'admin', '123.139.53.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1040, 'niujs', '117.20.117.54', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1041, 'admin', '112.1.144.134', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1042, 'admin', '112.1.144.134', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1043, 'admin', '43.230.11.148', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1044, 'admin', '43.255.118.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1045, 'admin', '43.255.118.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1046, 'ry', '43.255.118.131', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1047, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1048, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1049, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1050, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1051, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1052, 'admin', '123.184.128.163', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1053, 'admin', '183.217.37.226', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-30');
INSERT INTO `sys_logininfor` VALUES (1054, 'nanfeng', '182.239.115.151', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1055, 'admin', '61.130.175.214', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1056, 'admin', '114.106.99.4', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1057, 'admin', '171.219.185.63', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1058, 'admin', '127.0.0.1', '内网IP', 'Firefox 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1059, 'admin', '103.152.113.196', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1060, 'admin', '103.152.113.196', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1061, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1062, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1063, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-10-31');
INSERT INTO `sys_logininfor` VALUES (1064, 'admin', '115.204.33.228', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1065, 'admin', '223.87.42.151', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1066, 'admin', '223.87.42.151', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1067, 'admin', '223.87.42.151', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1068, 'admin', '112.244.72.74', 'XX XX', 'Chrome 9', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1069, 'admin', '112.244.72.74', 'XX XX', 'Chrome 9', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1070, 'admin', '58.153.181.202', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1071, 'admin', '58.153.181.202', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1072, 'admin', '58.153.181.202', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1073, 'admin', '123.183.235.87', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1074, 'admin', '106.114.56.147', 'XX XX', 'Chrome 12', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1075, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1076, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1077, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1078, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1079, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1080, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1081, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1082, 'admin', '39.144.138.98', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-01');
INSERT INTO `sys_logininfor` VALUES (1083, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1084, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1085, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1086, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1087, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1088, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1089, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1090, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1091, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1092, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1093, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1094, 'admin', '183.199.187.223', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1095, 'admin', '27.199.70.151', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1096, 'admin', '27.199.70.151', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1097, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1098, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1099, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1100, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1101, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1102, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1103, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1104, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码已失效', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1105, 'admin', '123.174.43.30', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1106, 'admin', '49.65.69.55', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1107, 'admin', '42.236.207.243', 'XX XX', 'Chrome 12', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-02');
INSERT INTO `sys_logininfor` VALUES (1108, 'admin', '49.217.130.201', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1109, 'admin', '49.7.4.166', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1110, 'admin', '14.116.140.75', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1111, 'admin', '123.182.48.248', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1112, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1113, 'admin', '103.231.84.5', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-03');
INSERT INTO `sys_logininfor` VALUES (1114, 'admin', '27.19.186.37', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1115, 'admin', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1116, 'ry', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1117, 'ry', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1118, 'ruoyi', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1119, 'admin', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1120, 'admin', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1121, 'admin', '27.128.38.97', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-04');
INSERT INTO `sys_logininfor` VALUES (1122, 'admin', '183.130.4.107', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1123, 'admin', '115.234.210.108', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1124, 'admin', '115.234.210.108', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1125, 'admin', '115.234.210.108', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1126, 'admin', '115.234.210.108', 'XX XX', 'Chrome 10', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1127, 'admin', '115.234.210.108', 'XX XX', 'Chrome 10', 'Windows 10', '1', '验证码错误', '2024-11-05');
INSERT INTO `sys_logininfor` VALUES (1128, 'daqian', '2409:8970:1b4:308b:8695:7859:3964:a1ce', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1129, 'admin', '110.184.203.213', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1130, 'admin', '110.184.203.213', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1131, 'admin', '49.7.3.94', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1132, 'admin', '115.216.234.249', 'XX XX', 'Chrome 10', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1133, 'admin', '115.216.234.249', 'XX XX', 'Chrome 10', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1134, '2149425819', '58.241.254.104', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1135, 'admin', '2408:8471:103:bcc2:5ba:481f:9d7:d2e8', '内网IP', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1136, 'admin', '36.45.21.160', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-06');
INSERT INTO `sys_logininfor` VALUES (1137, 'nanfeng', '182.239.93.118', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-07');
INSERT INTO `sys_logininfor` VALUES (1138, 'nanfeng', '182.239.93.118', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-07');
INSERT INTO `sys_logininfor` VALUES (1139, 'admin', '113.119.176.172', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-07');
INSERT INTO `sys_logininfor` VALUES (1140, 'admin', '39.144.157.103', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-07');
INSERT INTO `sys_logininfor` VALUES (1141, 'admin', '240e:456:ff00:22f1:4c41:44cb:7be8:3df3', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-07');
INSERT INTO `sys_logininfor` VALUES (1142, 'admin', '39.144.46.31', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1143, 'admin', '39.144.46.31', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1144, 'admin', '39.144.46.31', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1145, 'admin', '39.144.46.31', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1146, 'admin', '103.36.25.164', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1147, 'admin', '103.36.25.164', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1148, 'admin', '103.36.25.164', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1149, 'admin', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1150, 'admin', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1151, 'admin is', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1152, 'admin is', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1153, 'admin', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1154, 'admin', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1155, 'admin', '221.11.61.29', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1156, 'admin', '202.178.126.43', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1157, 'admin', '202.178.126.43', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1158, 'admin', '202.178.126.43', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1159, 'admin', '203.218.224.71', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '密码输入错误5次，帐户锁定10分钟', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1160, 'admin', '2408:8471:102:741f:6c48:589:89af:eac4', '内网IP', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1161, 'admin', '2408:8471:102:741f:6c48:589:89af:eac4', '内网IP', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-08');
INSERT INTO `sys_logininfor` VALUES (1162, 'admin', '205.198.66.67', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1163, 'admin', '205.198.66.67', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1164, 'admin', '113.16.104.95', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1165, 'admin', '101.44.81.227', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1166, 'admin', '101.44.81.227', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1167, 'admin', '101.44.81.227', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1168, 'admin', '101.44.81.227', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-09');
INSERT INTO `sys_logininfor` VALUES (1169, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 9', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1170, 'admin', '103.97.2.80', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1171, 'admin', '103.97.2.80', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1172, 'xiaogui', '123.138.183.38', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1173, 'xiaogui', '123.138.183.38', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1174, 'xiaogui', '123.138.183.38', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1175, 'xiaogui', '2408:8471:10a:f55d:9d05:f7de:86a2:6a14', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1176, 'xiaogui', '2408:8471:10a:f55d:9d05:f7de:86a2:6a14', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1177, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1178, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1179, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1180, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1181, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1182, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1183, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1184, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1185, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1186, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1187, 'xiaogui', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1188, 'admin', '103.97.2.77', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1189, 'xiaogui', '2408:8471:10a:f55d:9d05:f7de:86a2:6a14', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1190, 'nanfeng', '182.239.115.120', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1191, 'xiaogui', '2409:8970:194:2afa:12e:9218:2672:8fa0', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1192, 'xiaogui', '123.139.80.23', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1193, 'admin', '86.38.175.15', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1194, 'daqian123', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1195, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1196, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1197, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1198, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1199, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1200, 'admin', '103.40.79.118', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1201, 'admin', '103.40.79.118', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1202, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1203, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1204, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1205, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1206, 'admin', '220.195.77.203', 'XX XX', 'Mobile Safari', 'Android 4.x', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1207, 'xiaogui', '2409:8a70:34:69d0:50a4:d918:21d3:2acc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1208, 'admin', '117.140.185.47', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1209, 'admin', '117.140.185.47', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-10');
INSERT INTO `sys_logininfor` VALUES (1210, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1211, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1212, 'admin', '219.134.114.199', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1213, 'ry', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码已失效', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1214, 'ry', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1215, 'ruoyi', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1216, 'ruoyi', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码已失效', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1217, 'ruoyi', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1218, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1219, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1220, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1221, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1222, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1223, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1224, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1225, 'admin', '120.84.12.206', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1226, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1227, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1228, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1229, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1230, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1231, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1232, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1233, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1234, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-11');
INSERT INTO `sys_logininfor` VALUES (1235, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1236, 'xiaogui', '2409:8a70:34:69d0:71e3:9152:e0d5:2563', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1237, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1238, 'daqian', '51.158.203.70', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1239, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1240, 'nanfeng', '182.239.115.200', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1241, 'nanfeng', '182.239.93.91', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1242, 'admin', '49.7.4.32', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1243, 'admin', '49.7.4.29', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1244, 'lantian', '203.160.68.73', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1245, 'lantian', '203.160.68.73', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1246, 'admin', '103.231.84.2', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1247, 'xiaogui', '111.18.157.164', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1248, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1249, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1250, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1251, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1252, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1253, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1254, 'admin', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1255, 'admin', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1256, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1257, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1258, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1259, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1260, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1261, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-12');
INSERT INTO `sys_logininfor` VALUES (1262, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1263, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1264, 'xiaogui', '2409:8a70:34:69d0:e455:f24d:807:c8cd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1265, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1266, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1267, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1268, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1269, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1270, 'admin', '119.36.145.146', 'XX XX', 'Chrome 9', 'Windows 10', '1', '验证码错误', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1271, 'admin', '119.36.145.146', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1272, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-13');
INSERT INTO `sys_logininfor` VALUES (1273, 'daqian', '2409:8a70:34:69d0:3943:c8b6:1afb:efdc', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1274, 'daqian', '2409:8a70:34:69d0:3943:c8b6:1afb:efdc', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1275, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1276, 'daqian', '2409:8a70:34:69d0:40e8:8dbf:4235:adbc', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1277, 'admin', '43.252.208.142', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1278, 'admin', '116.169.81.231', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1279, 'admin', '116.169.81.231', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1280, 'admin', '116.169.81.231', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1281, 'admin', '116.169.81.231', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1282, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1283, 'xiaogui', '2409:8a70:34:69d0:fd11:c91f:ef0c:4303', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1284, 'admin', '119.86.18.249', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1285, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1286, 'daqian', '2409:8a70:34:69d0:c1a:3b3a:8df8:c8d9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1287, 'daqian', '2409:8a70:34:69d0:c1a:3b3a:8df8:c8d9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1288, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1289, 'admin', '101.44.81.227', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1290, 'niujs', '117.20.112.61', 'XX XX', 'Chrome Mobile', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1291, 'daqian', '2409:8a70:34:69d0:c1a:3b3a:8df8:c8d9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1292, 'admin', '101.44.80.255', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1293, 'daqian', '2409:8a70:34:69d0:c1a:3b3a:8df8:c8d9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1294, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1295, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1296, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1297, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1298, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1299, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1300, 'niujs', '117.20.112.61', 'XX XX', 'Chrome Mobile', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1301, 'admin', '61.158.57.210', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1302, 'admin', '61.158.57.210', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1303, 'admin', '61.158.57.210', 'XX XX', 'Chrome 11', 'Windows 10', '1', '验证码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1304, 'admin', '183.214.131.146', 'XX XX', 'Chrome 10', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1305, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-14');
INSERT INTO `sys_logininfor` VALUES (1306, 'xiaogui', '2409:8a70:34:69d0:99d3:5f0e:4888:d2ac', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1307, 'xiaogui', '2409:8a70:34:69d0:31cf:7aa4:26a6:b630', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1308, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1309, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1310, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1311, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1312, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1313, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1314, 'admin', '114.27.130.101', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1315, 'admin', '114.27.130.101', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1316, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1317, 'xiaogui', '2409:8a70:34:69d0:31cf:7aa4:26a6:b630', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1318, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1319, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1320, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1321, 'xiaogui', '2409:8a70:34:69d0:31cf:7aa4:26a6:b630', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1322, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-15');
INSERT INTO `sys_logininfor` VALUES (1323, 'admin', '171.233.58.57', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1324, 'daqian123', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1325, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1326, 'daqian', '2409:8a70:34:69d0:f4db:624d:761b:bfc9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1327, 'admin', '115.227.40.246', 'XX XX', 'Apple WebKit', 'Mac OS X (iPad)', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1328, 'admin', '183.131.239.184', 'XX XX', 'Apple WebKit', 'Mac OS X (iPad)', '1', '验证码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1329, 'admin', '115.227.42.203', 'XX XX', 'Apple WebKit', 'Mac OS X (iPad)', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1330, 'admin', '115.227.40.13', 'XX XX', 'Apple WebKit', 'Mac OS X (iPad)', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1331, 'admin', '115.227.40.127', 'XX XX', 'Apple WebKit', 'Mac OS X (iPad)', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1332, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1333, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1334, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1335, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1336, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1337, 'admin', '182.135.65.250', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1338, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1339, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-16');
INSERT INTO `sys_logininfor` VALUES (1340, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1341, 'xiaogui', '2409:8a70:34:69d0:7cfc:4ca0:3817:fc1d', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1342, 'admin', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1343, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1344, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1345, 'admin', '101.44.83.234', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1346, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1347, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1348, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1349, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1350, 'admin', '117.64.179.114', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1351, 'admin', '45.158.180.42', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1352, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1353, 'niujs', '117.20.112.61', 'XX XX', 'Chrome Mobile', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1354, 'admin', '183.42.210.123', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1355, 'admin', '183.42.210.123', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1356, 'admin', '183.42.210.123', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1357, 'admin', '103.97.2.75', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1358, 'daqian', '2409:8a70:34:69d0:a8ec:614e:716c:c53a', '内网IP', 'Chrome Mobile', 'Android 1.x', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1359, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1360, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1361, 'admin', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1362, 'daqian', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1363, 'daqian', '160.30.128.102', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1364, 'admin', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1365, 'admin', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1366, 'daqian', '160.30.128.105', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1367, 'nanfeng', '113.52.83.84', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1368, 'daqian', '2409:8a70:34:69d0:245c:aeed:3666:28ba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1369, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1370, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1371, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1372, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1373, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1374, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1375, 'admin', '49.7.3.216', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1376, 'admin', '49.7.3.232', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1377, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-17');
INSERT INTO `sys_logininfor` VALUES (1378, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1379, 'admin', '43.230.11.232', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1380, 'daqian', '2409:8a70:34:69d0:2d80:d2e9:53a3:1182', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1381, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1382, 'xiaogui', '2409:8a70:34:69d0:90bc:2ae8:db4d:bd41', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1383, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1384, 'daqian', '2409:8a70:34:69d0:2d80:d2e9:53a3:1182', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1385, 'admin', '205.198.121.121', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1386, 'admin', '205.198.121.121', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1387, 'daqian', '2409:8a70:34:69d0:2d80:d2e9:53a3:1182', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1388, 'admin', '205.198.121.117', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1389, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1390, 'nanfeng', '113.52.82.64', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1391, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1392, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1393, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1394, 'admin', '182.143.152.174', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1395, 'admin', '182.143.152.174', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1396, 'admin', '182.143.152.174', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1397, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1398, 'niujs', '117.20.112.61', 'XX XX', 'Chrome Mobile', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1399, 'xiaogui', '2409:8a70:34:69d0:4c17:626c:b90a:9bb4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1400, 'noone', '117.20.112.61', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1401, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1402, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1403, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1404, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1405, 'daqian', '2409:8a70:34:69d0:8874:5ffa:ba15:af26', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1406, 'niujs', '110.235.223.179', 'XX XX', 'Safari', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1407, 'admin', '103.97.2.34', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1408, 'admin', '103.97.2.34', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1409, 'admin', '103.97.2.34', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1410, 'admin', '101.44.82.178', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1411, 'admin', '101.44.82.178', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1412, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '1', '验证码已失效', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1413, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1414, 'admin', '103.97.2.99', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1415, '\'or 1=1 #', '1.36.166.125', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1416, '\'or 1=1 #', '1.36.166.125', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1417, '\'or1=1#', '1.36.166.125', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1418, '\'or1=1#', '13.215.156.251', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1419, 'admin', '54.193.236.112', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1420, 'admin', '54.193.236.112', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1421, 'niabie1', '54.193.236.112', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1422, 'niabie', '54.193.236.112', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1423, '\'or1=1# http://27.124.40.139/topUp/index', '54.193.236.112', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1424, 'daqian', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1425, 'admin', '5.83.221.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1426, 'admin', '5.83.221.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1427, 'admin', '5.83.221.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1428, 'niabie123', '5.83.221.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1429, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1430, 'niabie123', '5.83.221.61', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1431, 'daqian', '2409:8a70:34:69d0:32:1c78:a115:aa54', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1432, 'nanfeng', '113.52.82.64', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1433, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1434, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1435, 'daqian', '2409:8a70:34:69d0:32:1c78:a115:aa54', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1436, 'daqian', '2409:8a70:34:69d0:32:1c78:a115:aa54', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1437, 'admin', '43.252.208.78', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1438, 'admin', '43.252.208.78', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1439, 'niujs', '43.252.208.76', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1440, 'niujs', '43.252.208.78', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1441, 'admin', '43.252.208.76', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1442, 'niujs', '117.20.112.61', 'XX XX', 'Chrome Mobile', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1443, 'noone', '117.20.112.61', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1444, 'noone', '117.20.112.61', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1445, 'niujs', '117.20.112.61', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1446, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-18');
INSERT INTO `sys_logininfor` VALUES (1447, 'xiaogui', '2409:8a70:34:69d0:5c95:6f26:36ef:a716', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1448, 'daqian', '2409:8a70:34:69d0:32:1c78:a115:aa54', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1449, 'xiaogui', '2409:8a70:32:0:3167:753d:3e64:4e57', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1450, 'xiaogui', '2409:8a70:32:0:3167:753d:3e64:4e57', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1451, 'admin', '49.7.3.123', 'XX XX', 'Chrome Mobile', 'Android Mobile', '1', '用户不存在/密码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1452, 'admin', '123.147.251.203', 'XX XX', 'Chrome Mobile', 'Android Mobile', '1', '用户不存在/密码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1453, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1454, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1455, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1456, 'daqian', '2409:8a70:32:0:b9a5:9f85:7dd1:eee7', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1457, 'admin', '101.44.81.127', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1458, 'admin', '101.44.80.255', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1459, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1460, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1461, 'daqian', '2409:8a70:32:0:b9a5:9f85:7dd1:eee7', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1462, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码已失效', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1463, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1464, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1465, 'lantian', '203.160.80.166', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1466, 'lantian', '203.160.80.166', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1467, 'lantian', '203.160.80.166', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1468, 'lantian', '203.160.80.166', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1469, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1470, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1471, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1472, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1473, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1474, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1475, 'admin', '2001:f40:907:6f51:5066:5dbd:161c:626e', '内网IP', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1476, 'hoshimi', '161.142.253.249', 'XX XX', 'Chrome 12', 'Windows 10', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1477, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1478, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1479, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-19');
INSERT INTO `sys_logininfor` VALUES (1480, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1481, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1482, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1483, 'xiaogui', '2409:8a70:32:0:c23:dcde:1014:3a03', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1484, 'admin', '205.198.121.120', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1485, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1486, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1487, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1488, 'admin', '221.208.29.45', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1489, 'admin', '120.84.11.116', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1490, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1491, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1492, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1493, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1494, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1495, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1496, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1497, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1498, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1499, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1500, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1501, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1502, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1503, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1504, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1505, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1506, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1507, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1508, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1509, 'xiaogui', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1510, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1511, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1512, 'admin', '114.105.10.144', 'XX XX', 'Chrome 12', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1513, 'admin', '114.105.10.144', 'XX XX', 'Chrome 12', 'Windows 7', '1', '验证码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1514, 'admin', '114.105.10.144', 'XX XX', 'Chrome 12', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1515, 'daqian', '2409:8a70:32:0:2d6f:6faa:4168:7bd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1516, 'admin', '101.44.80.255', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1517, 'daqian', '2409:8a70:32:0:2d6f:6faa:4168:7bd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1518, 'admin', '103.43.162.201', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1519, 'admin', '101.44.80.255', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1520, 'admin', '111.41.163.244', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1521, 'admin', '111.41.163.244', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1522, 'admin', '111.41.163.244', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1523, 'admin', '117.179.96.97', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1524, 'admin', '117.179.96.97', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1525, 'admin', '103.43.162.202', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1526, 'daqian', '2409:8a70:32:0:2d6f:6faa:4168:7bd', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1527, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-20');
INSERT INTO `sys_logininfor` VALUES (1528, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1529, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1530, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1531, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1532, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1533, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1534, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1535, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1536, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1537, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1538, 'test', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1539, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1540, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1541, 'admin', '103.97.2.72', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1542, 'xiaogui', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1543, 'admin', '43.252.208.131', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1544, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1545, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1546, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1547, 'test', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1548, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1549, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1550, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1551, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1552, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1553, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1554, 'test', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1555, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1556, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1557, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1558, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1559, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1560, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1561, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1562, 'test', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1563, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1564, 'admin', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1565, 'ry', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1566, 'test', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1567, 'ceshi', '141.11.46.140', 'XX XX', 'Robot/Spider', 'Unknown', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1568, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1569, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1570, 'admin', '1.49.184.95', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1571, 'admin', '1.49.184.95', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1572, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1573, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1574, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1575, 'admin', '45.158.180.51', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1576, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1577, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1578, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1579, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1580, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1581, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1582, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1583, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1584, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-21');
INSERT INTO `sys_logininfor` VALUES (1585, 'admin', '103.43.162.199', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1586, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1587, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1588, 'daqian', '2409:8a70:32:0:2565:23a6:b583:aeba', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1589, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1590, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1591, 'admin', '49.93.110.135', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1592, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1593, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1594, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1595, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1596, 'xiaogui', '2409:8a70:32:0:cd3c:7807:9b1:5bf6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1597, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '退出成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1598, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1599, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1600, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1601, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1602, 'admin', '49.7.6.251', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1603, 'admin', '49.7.6.182', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1604, 'admin', '49.7.6.210', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1605, 'admin', '110.176.54.178', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1606, 'admin', '106.8.138.120', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1607, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1608, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1609, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1610, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1611, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1612, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1613, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1614, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1615, 'admin', '8.212.61.67', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1616, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1617, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1618, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1619, 'daqian', '2409:8a70:32:0:bcb2:c53f:4995:8f24', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1620, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1621, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1622, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1623, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1624, 'admin', '43.252.208.43', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-22');
INSERT INTO `sys_logininfor` VALUES (1625, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1626, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1627, 'xiaogui', '2409:8a70:32:0:11eb:c3cf:793a:68ee', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1628, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1629, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1630, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1631, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1632, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1633, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1634, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1635, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1636, 'admin', '101.44.80.236', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1637, 'admin', '101.44.80.236', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1638, 'admin', '101.44.80.236', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1639, 'admin', '101.44.80.236', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1640, 'admin', '182.255.32.11', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1641, 'ry', '182.255.32.11', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1642, 'admin', '182.255.32.11', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1643, 'admin', '103.40.79.5', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1644, 'daqian', '2409:8a70:32:0:a581:45c6:ff53:53ec', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1645, 'daqian', '2409:8a70:32:0:a581:45c6:ff53:53ec', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1646, 'daqian', '2409:8a70:32:0:a581:45c6:ff53:53ec', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1647, 'daqian', '2409:8a70:32:0:a581:45c6:ff53:53ec', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1648, 'daqian', '2409:8a70:32:0:a581:45c6:ff53:53ec', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1649, 'nanfeng', '113.52.83.113', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1650, 'admin', '125.88.26.1', 'XX XX', 'Chrome 8', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-23');
INSERT INTO `sys_logininfor` VALUES (1651, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1652, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1653, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1654, 'luc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1655, 'luc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1656, 'luc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1657, 'luc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1658, 'luc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1659, 'lhc', '167.179.41.99', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1660, 'admin', '168.70.118.50', 'XX XX', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1661, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1662, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1663, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1664, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1665, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '1', '验证码已失效', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1666, 'admin', '49.7.3.105', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1667, 'admin', '49.7.3.75', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1668, 'admin', '49.7.3.73', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1669, 'admin', '103.43.162.208', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1670, 'daqian', '2409:8a70:32:0:3117:bc00:87d2:7ade', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1671, 'daqian', '2409:8a70:32:0:3117:bc00:87d2:7ade', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1672, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1673, 'daqian', '2001:bc8:701:18:1618:77ff:fe46:63bf', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1674, 'admin', '43.252.208.42', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1675, 'admin', '43.252.208.42', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1676, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1677, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1678, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1679, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1680, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1681, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1682, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1683, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1684, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1685, 'adminn', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1686, 'adminn', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1687, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1688, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1689, 'adminn', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1690, 'xiaogui', '2409:8a70:32:0:68ae:3206:67ae:c812', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1691, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1692, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1693, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1694, 'admin', '182.34.192.139', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1695, 'admin', '182.34.192.139', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1696, 'admin', '182.34.192.139', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1697, 'admin', '182.34.192.139', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1698, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1699, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1700, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1701, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1702, 'xiaogui', '2409:8a70:32:0:499a:dad:267b:ca58', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1703, 'daqian', '2409:8a1b:86:a970:58ae:6068:f4d8:cc13', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1704, 'daqian', '2409:8a1b:86:a970:58ae:6068:f4d8:cc13', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1705, 'admin', '120.239.99.67', 'XX XX', 'Chrome 12', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1706, 'daqian', '2409:8a70:32:0:81ff:5b7e:8df6:2a75', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1707, 'daqian', '2409:8a70:32:0:81ff:5b7e:8df6:2a75', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1708, 'admin', '165.154.21.66', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1709, 'admin', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1710, 'adminn', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1711, 'adminn', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1712, 'daqian', '109.61.18.153', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-24');
INSERT INTO `sys_logininfor` VALUES (1713, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Mac OS X', '0', '登录成功', '2024-11-25');
INSERT INTO `sys_logininfor` VALUES (1714, 'admin', '103.231.84.10', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-25');
INSERT INTO `sys_logininfor` VALUES (1715, 'admin', '101.44.82.58', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1716, 'admin', '101.44.82.58', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1717, 'admin', '112.96.54.213', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1718, 'admin', '43.230.11.183', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1719, 'xiaogui', '2409:8a70:32:0:16:970a:264d:d2', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1720, 'xiaogui', '2409:8a70:32:0:16:970a:264d:d2', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1721, 'xiaogui', '2409:8a70:32:0:16:970a:264d:d2', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1722, 'xiaogui', '2409:8a70:32:0:a53f:513d:2ec8:db1a', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1723, 'xiaogui', '2409:8a70:32:0:a53f:513d:2ec8:db1a', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1724, 'admin', '101.44.80.236', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1725, 'xiaogui', '2409:8a70:32:0:a53f:513d:2ec8:db1a', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1726, 'xiaogui', '2409:8a70:32:0:a53f:513d:2ec8:db1a', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1727, 'admin', '95.174.71.28', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-26');
INSERT INTO `sys_logininfor` VALUES (1728, 'daqian', '2409:8a70:32:0:8570:2a44:cc8a:26a4', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1729, 'admin', '103.43.162.210', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1730, 'daqian', '2409:8a70:32:0:84d6:a102:1b2f:c81e', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1731, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1732, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1733, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1734, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1735, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1736, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1737, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1738, 'xiaogui', '2409:8a70:32:0:c3d4:172e:e03f:ae17', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1739, 'daqian', '2409:8a70:32:0:84d6:a102:1b2f:c81e', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1740, 'daqian', '2409:8a70:32:0:84d6:a102:1b2f:c81e', '内网IP', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1741, 'daqian', '2409:8a70:32:0:84d6:a102:1b2f:c81e', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1742, 'admin', '101.44.80.58', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1743, 'daqian', '2409:8a70:32:0:84d6:a102:1b2f:c81e', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1744, 'admin', '58.41.88.22', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-27');
INSERT INTO `sys_logininfor` VALUES (1745, 'admin', '205.198.122.11', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1746, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1747, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1748, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1749, 'admin', '165.154.72.139', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1750, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1751, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1752, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1753, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1754, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1755, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1756, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1757, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1758, 'xiaogui', '2409:8a70:b1:19e0:cd41:45fe:628e:65e9', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1759, 'admin', '103.231.84.11', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1760, 'admin', '103.231.84.8', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1761, 'admin', '211.94.109.80', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-28');
INSERT INTO `sys_logininfor` VALUES (1762, 'daqian', '2409:8a70:b1:19e0:58ea:5887:870a:de82', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1763, 'daqian', '2409:8a70:b1:19e0:58ea:5887:870a:de82', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1764, 'xiaogui', '2409:8a70:b1:19e0:b981:fc03:c556:5976', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1765, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1766, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1767, 'admin', '49.7.3.94', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1768, 'admin', '49.7.3.74', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1769, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1770, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1771, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1772, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1773, 'xiaogui', '2409:8a70:b1:19e0:8dc0:e567:d4f:7273', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1774, 'admin', '103.231.84.11', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1775, 'daqian', '2409:8a70:b1:19e0:1152:fc2a:39dc:8378', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1776, 'admin', '103.40.79.161', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1777, 'admin', '103.40.79.161', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1778, 'daqian', '2409:8a70:b1:19e0:1152:fc2a:39dc:8378', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1779, 'lantian', '203.160.72.36', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1780, 'lantian', '203.160.72.36', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1781, 'admin', '183.218.222.228', 'XX XX', 'Chrome 10', 'Windows 7', '1', '验证码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1782, 'admin', '183.218.222.228', 'XX XX', 'Chrome 10', 'Windows 7', '1', '用户不存在/密码错误', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1783, 'admin', '165.154.72.127', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-29');
INSERT INTO `sys_logininfor` VALUES (1784, 'admin', '49.7.3.76', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1785, 'admin', '120.227.86.189', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1786, 'admin', '120.227.86.189', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1787, 'admin', '120.227.86.189', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1788, 'admin', '113.52.83.67', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1789, 'nanfeng', '113.52.83.67', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1790, 'nanfeng', '113.52.83.67', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1791, 'xiaogui', '2409:8a70:b1:19e0:e09c:730f:20c9:a6d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1792, 'xiaogui', '2409:8a70:b1:19e0:c545:5c18:67b9:a479', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1793, 'xiaogui', '2409:8a70:b1:19e0:c545:5c18:67b9:a479', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1794, 'admin', '113.211.209.146', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1795, 'Berrie', '113.211.209.146', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1796, 'admin', '106.8.131.166', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1797, 'admin', '123.182.50.252', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1798, 'admin', '123.183.235.87', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1799, 'admin', '106.8.131.166', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1800, 'xiaogui', '2409:8a70:b1:19e0:c545:5c18:67b9:a479', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1801, 'xiaogui', '2409:8a70:b1:19e0:c545:5c18:67b9:a479', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1802, 'nanfeng', '113.52.83.66', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1803, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1804, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1805, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1806, 'nanfeng', '113.52.83.74', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1807, 'xiaogui', '2409:8a70:b1:19e0:c545:5c18:67b9:a479', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1808, 'nanfeng', '113.52.82.68', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1809, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1810, 'daqian', '2409:8a70:b1:19e0:302d:9e03:4a92:4c09', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1811, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1812, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1813, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1814, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1815, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1816, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1817, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1818, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码已失效', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1819, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1820, 'admin', '112.38.139.140', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1821, 'admin', '103.43.162.204', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1822, 'daqian', '2409:8a70:b1:19e0:302d:9e03:4a92:4c09', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1823, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1824, 'daqian', '2409:8a70:b1:19e0:302d:9e03:4a92:4c09', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-11-30');
INSERT INTO `sys_logininfor` VALUES (1825, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1826, 'admin', '103.231.84.3', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1827, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1828, 'admin', '171.114.165.20', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1829, 'admin', '171.114.165.20', 'XX XX', 'Chrome 12', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1830, 'admin', '106.119.229.25', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1831, 'admin', '49.7.4.65', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1832, 'admin', '49.7.4.91', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1833, 'admin', '49.7.4.66', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1834, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1835, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1836, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1837, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1838, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1839, 'admin', '218.28.87.201', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1840, 'admin', '61.163.139.236', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1841, 'admin', '58.243.225.234', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1842, 'admin', '58.243.225.234', 'XX XX', 'Chrome 8', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1843, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1844, 'nanfeng', '113.52.82.68', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1845, 'admin', '59.51.47.95', 'XX XX', 'Chrome 12', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1846, 'xiaogui', '2409:8a70:b1:19e0:448:a1d2:39c1:5714', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1847, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1848, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1849, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1850, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1851, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1852, 'lantian', '203.160.86.131', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1853, 'daqian', '2409:8a70:b1:19e0:7134:3688:2b41:3c46', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1854, 'admin', '16.162.106.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1855, 'admin', '16.162.106.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1856, '18086800049', '16.162.106.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1857, '18086800049', '16.162.106.238', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1858, 'nanfeng', '113.52.82.68', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1859, 'admin', '49.7.3.215', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1860, 'admin', '49.7.3.235', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1861, 'admin', '49.7.3.243', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1862, 'admin', '49.7.3.212', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1863, 'admin', '49.7.3.228', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1864, 'admin', '49.7.3.225', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1865, 'admin', '49.7.3.200', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1866, 'daqian', '2409:8a70:b1:19e0:7134:3688:2b41:3c46', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-01');
INSERT INTO `sys_logininfor` VALUES (1867, 'daqian', '2409:8a70:b1:19e0:7134:3688:2b41:3c46', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1868, 'daqian', '2409:8a70:b1:19e0:7134:3688:2b41:3c46', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1869, 'xiaogui', '2409:8a70:b1:19e0:5f6:7e27:cd6f:6142', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1870, 'xiaogui', '2409:8a70:b1:19e0:5f6:7e27:cd6f:6142', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1871, 'admin', '121.8.15.41', 'XX XX', 'Chrome 11', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1872, 'xiaogui', '2409:8a70:b1:19e0:5f6:7e27:cd6f:6142', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1873, 'daqian', '2409:8a70:b1:19e0:7134:3688:2b41:3c46', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1874, 'xiaogui', '2409:8a70:b1:19e0:5f6:7e27:cd6f:6142', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1875, 'nanfeng', '113.52.83.112', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1876, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1877, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1878, 'nanfeng', '113.52.83.112', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1879, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1880, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1881, 'nanfeng', '113.52.83.112', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1882, 'admin', '103.40.79.121', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1883, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1884, 'admin', '125.64.49.18', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1885, 'admin', '125.64.49.18', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1886, 'admin', '223.104.67.191', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1887, 'admin', '223.104.67.191', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1888, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1889, 'daqian', '2409:8a70:b1:19e0:42eb:3e35:5736:d8f5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1890, 'admin', '103.43.162.206', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1891, 'daqian', '2409:8a70:b1:19e0:42eb:3e35:5736:d8f5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-02');
INSERT INTO `sys_logininfor` VALUES (1892, 'admin', '45.158.180.78', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1893, 'xiaogui', '2409:8a70:b1:19e0:e16c:59d3:4994:9be5', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1894, 'nanfeng', '113.52.83.79', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1895, 'admin', '127.0.0.1', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1896, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1897, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1898, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1899, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1900, 'admin', '103.97.2.79', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1901, 'daqian', '2409:8a70:b1:19e0:7de1:b241:1309:e79e', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1902, 'admin', '49.7.4.29', 'XX XX', 'Chrome 10', 'Windows XP', '1', '用户不存在/密码错误', '2024-12-03');
INSERT INTO `sys_logininfor` VALUES (1903, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1904, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1905, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1906, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1907, 'admin', '116.169.80.71', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1908, 'admin', '119.117.39.253', 'XX XX', 'Mobile Safari', 'Mac OS X (iPhone)', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1909, 'nanfeng', '113.52.83.87', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1910, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1911, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1912, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1913, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1914, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1915, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1916, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1917, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1918, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码已失效', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1919, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1920, 'xiaogui', '2409:8a70:b1:19e0:7c8b:64e5:4cec:759f', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1921, 'admin', '36.229.110.36', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1922, 'admin', '112.120.110.190', 'XX XX', 'Firefox 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1923, 'admin', '54.169.0.52', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1924, 'admin', '117.95.235.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1925, 'admin', '117.95.235.20', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1926, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-04');
INSERT INTO `sys_logininfor` VALUES (1927, 'admin', '165.154.21.66', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1928, 'admin', '103.116.72.8', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1929, 'ry', '103.116.72.8', 'XX XX', 'Chrome 13', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1930, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1931, 'admin', '206.237.119.151', 'XX XX', 'Chrome 12', 'Mac OS X', '1', '验证码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1932, 'admin', '206.237.119.151', 'XX XX', 'Chrome 12', 'Mac OS X', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1933, 'ry', '206.237.119.151', 'XX XX', 'Chrome 12', 'Mac OS X', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1934, 'admin', '206.237.119.151', 'XX XX', 'Chrome 12', 'Mac OS X', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1935, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1936, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1937, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '1', '验证码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1938, 'xiaogui', '2409:8a70:b1:19e0:603c:d7e5:f631:f7d6', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1939, 'admin', '101.44.82.217', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1940, 'admin', '101.44.82.217', 'XX XX', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1941, 'admin', '101.44.82.217', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1942, 'admin', '115.227.41.8', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1943, 'admin', '115.227.40.196', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1944, 'admin', '115.227.42.115', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1945, 'admin', '183.131.239.206', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1946, 'admin', '115.227.43.16', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '验证码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1947, 'xiaogui', '2409:8a70:b1:19e0:a53f:2090:a040:c694', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1948, 'admin', '125.42.255.31', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1949, 'admin', '125.42.255.31', 'XX XX', 'Chrome 9', 'Windows 10', '1', '验证码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1950, 'admin', '125.42.255.31', 'XX XX', 'Chrome 9', 'Windows 10', '1', '用户不存在/密码错误', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1951, 'xiaogui', '2409:8a70:b1:19e0:6d8e:7da3:e034:7ed3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-05');
INSERT INTO `sys_logininfor` VALUES (1952, 'admin', '126.33.123.155', 'XX XX', 'Chrome Mobile', 'Android 1.x', '1', '用户不存在/密码错误', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1953, 'nanfeng', '113.52.83.84', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1954, 'nanfeng', '113.52.83.84', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1955, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1956, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1957, 'admin', '205.198.122.6', 'XX XX', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1958, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1959, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '退出成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1960, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1961, 'daqian', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1962, 'xiaogui', '2409:8a70:31:f7b0:a99f:ab85:f616:a7d3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1963, 'nanfeng', '8.212.13.108', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1964, 'xiaogui', '2409:8a70:31:f7b0:a99f:ab85:f616:a7d3', '内网IP', 'Chrome 13', 'Windows 10', '0', '登录成功', '2024-12-06');
INSERT INTO `sys_logininfor` VALUES (1965, 'nanfeng', '8.212.13.108', 'XX XX', 'Apple WebKit', 'Mac OS X (iPhone)', '0', '登录成功', '2024-12-06');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` bigint(20) NULL DEFAULT NULL,
  `menu_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_id` bigint(20) NULL DEFAULT NULL,
  `order_num` int(11) NULL DEFAULT NULL,
  `path` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `component` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `query` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_frame` int(11) NULL DEFAULT NULL,
  `is_cache` int(11) NULL DEFAULT NULL,
  `menu_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `visible` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `perms` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '系统管理', 0, 10, 'system', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'system', 'admin', '2023-03-27', 'admin', '2024-11-15', '系统管理目录');
INSERT INTO `sys_menu` VALUES (2, '系统监控', 0, 5, 'monitor', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'monitor', 'admin', '2023-03-27', 'admin', '2024-11-15', '系统监控目录');
INSERT INTO `sys_menu` VALUES (3, '系统工具', 0, 8, 'tool', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'tool', 'admin', '2023-03-27', 'admin', '2024-11-15', '系统工具目录');
INSERT INTO `sys_menu` VALUES (100, '用户管理', 1, 1, 'user', 'system/user/index', NULL, 1, NULL, 'C', '0', '0', 'system:user:list', 'user', 'admin', '2023-03-27', NULL, NULL, '用户管理菜单');
INSERT INTO `sys_menu` VALUES (101, '角色管理', 1, 2, 'role', 'system/role/index', NULL, 1, NULL, 'C', '0', '0', 'system:role:list', 'peoples', 'admin', '2023-03-27', NULL, NULL, '角色管理菜单');
INSERT INTO `sys_menu` VALUES (102, '菜单管理', 1, 3, 'menu', 'system/menu/index', NULL, 1, NULL, 'C', '0', '0', 'system:menu:list', 'tree-table', 'admin', '2023-03-27', NULL, NULL, '菜单管理菜单');
INSERT INTO `sys_menu` VALUES (103, '部门管理', 1, 4, 'dept', 'system/dept/index', NULL, 1, NULL, 'C', '0', '0', 'system:dept:list', 'tree', 'admin', '2023-03-27', NULL, NULL, '部门管理菜单');
INSERT INTO `sys_menu` VALUES (104, '岗位管理', 1, 5, 'post', 'system/post/index', NULL, 1, NULL, 'C', '0', '0', 'system:post:list', 'post', 'admin', '2023-03-27', NULL, NULL, '岗位管理菜单');
INSERT INTO `sys_menu` VALUES (105, '字典管理', 1, 6, 'dict', 'system/dict/index', NULL, 1, NULL, 'C', '0', '0', 'system:dict:list', 'dict', 'admin', '2023-03-27', NULL, NULL, '字典管理菜单');
INSERT INTO `sys_menu` VALUES (106, '参数设置', 1, 7, 'config', 'system/config/index', NULL, 1, NULL, 'C', '0', '0', 'system:config:list', 'edit', 'admin', '2023-03-27', NULL, NULL, '参数设置菜单');
INSERT INTO `sys_menu` VALUES (107, '通知公告', 1, 8, 'notice', 'system/notice/index', NULL, 1, NULL, 'C', '0', '0', 'system:notice:list', 'message', 'admin', '2023-03-27', NULL, NULL, '通知公告菜单');
INSERT INTO `sys_menu` VALUES (108, '日志管理', 1, 9, 'log', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'log', 'admin', '2023-03-27', NULL, NULL, '日志管理菜单');
INSERT INTO `sys_menu` VALUES (109, '在线用户', 2, 1, 'online', 'monitor/online/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:online:list', 'online', 'admin', '2023-03-27', NULL, NULL, '在线用户菜单');
INSERT INTO `sys_menu` VALUES (110, '定时任务', 2, 2, 'job', 'monitor/job/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:job:list', 'job', 'admin', '2023-03-27', NULL, NULL, '定时任务菜单');
INSERT INTO `sys_menu` VALUES (111, '数据监控', 2, 3, 'druid', 'monitor/druid/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:druid:list', 'druid', 'admin', '2023-03-27', NULL, NULL, '数据监控菜单');
INSERT INTO `sys_menu` VALUES (112, '服务监控', 2, 4, 'server', 'monitor/server/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:server:list', 'server', 'admin', '2023-03-27', NULL, NULL, '服务监控菜单');
INSERT INTO `sys_menu` VALUES (113, '缓存监控', 2, 5, 'cache', 'monitor/cache/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:cache:list', 'redis', 'admin', '2023-03-27', NULL, NULL, '缓存监控菜单');
INSERT INTO `sys_menu` VALUES (114, '缓存列表', 2, 6, 'cacheList', 'monitor/cache/list', NULL, 1, NULL, 'C', '0', '0', 'monitor:cache:list', 'redis-list', 'admin', '2023-03-27', NULL, NULL, '缓存列表菜单');
INSERT INTO `sys_menu` VALUES (115, '表单构建', 3, 1, 'build', 'tool/build/index', NULL, 1, NULL, 'C', '0', '0', 'tool:build:list', 'build', 'admin', '2023-03-27', NULL, NULL, '表单构建菜单');
INSERT INTO `sys_menu` VALUES (116, '代码生成', 3, 2, 'gen', 'tool/gen/index', NULL, 1, NULL, 'C', '0', '0', 'tool:gen:list', 'code', 'admin', '2023-03-27', NULL, NULL, '代码生成菜单');
INSERT INTO `sys_menu` VALUES (117, '系统接口', 3, 3, 'swagger', 'tool/swagger/index', NULL, 1, NULL, 'C', '0', '0', 'tool:swagger:list', 'swagger', 'admin', '2023-03-27', NULL, NULL, '系统接口菜单');
INSERT INTO `sys_menu` VALUES (500, '操作日志', 108, 1, 'operlog', 'monitor/operlog/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:operlog:list', 'form', 'admin', '2023-03-27', NULL, NULL, '操作日志菜单');
INSERT INTO `sys_menu` VALUES (501, '登录日志', 108, 2, 'logininfor', 'monitor/logininfor/index', NULL, 1, NULL, 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', 'admin', '2023-03-27', NULL, NULL, '登录日志菜单');
INSERT INTO `sys_menu` VALUES (1000, '用户查询', 100, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1001, '用户新增', 100, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1002, '用户修改', 100, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1003, '用户删除', 100, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1004, '用户导出', 100, 5, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1005, '用户导入', 100, 6, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:import', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1006, '重置密码', 100, 7, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:user:resetPwd', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1007, '角色查询', 101, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:role:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1008, '角色新增', 101, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:role:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1009, '角色修改', 101, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:role:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1010, '角色删除', 101, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:role:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1011, '角色导出', 101, 5, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:role:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1012, '菜单查询', 102, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:menu:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1013, '菜单新增', 102, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:menu:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1014, '菜单修改', 102, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:menu:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1015, '菜单删除', 102, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:menu:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1016, '部门查询', 103, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dept:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1017, '部门新增', 103, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dept:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1018, '部门修改', 103, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dept:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1019, '部门删除', 103, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dept:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1020, '岗位查询', 104, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:post:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1021, '岗位新增', 104, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:post:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1022, '岗位修改', 104, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:post:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1023, '岗位删除', 104, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:post:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1024, '岗位导出', 104, 5, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:post:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1025, '字典查询', 105, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dict:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1026, '字典新增', 105, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dict:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1027, '字典修改', 105, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dict:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1028, '字典删除', 105, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dict:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1029, '字典导出', 105, 5, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:dict:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1030, '参数查询', 106, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:config:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1031, '参数新增', 106, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:config:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1032, '参数修改', 106, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:config:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1033, '参数删除', 106, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:config:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1034, '参数导出', 106, 5, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:config:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1035, '公告查询', 107, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:notice:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1036, '公告新增', 107, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:notice:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1037, '公告修改', 107, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:notice:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1038, '公告删除', 107, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'system:notice:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1039, '操作查询', 500, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:operlog:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1040, '操作删除', 500, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:operlog:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1041, '日志导出', 500, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:operlog:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1042, '登录查询', 501, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:logininfor:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1043, '登录删除', 501, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:logininfor:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1044, '日志导出', 501, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:logininfor:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1045, '账户解锁', 501, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:logininfor:unlock', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1046, '在线查询', 109, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:online:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1047, '批量强退', 109, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:online:batchLogout', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1048, '单条强退', 109, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:online:forceLogout', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1049, '任务查询', 110, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1050, '任务新增', 110, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:add', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1051, '任务修改', 110, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1052, '任务删除', 110, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1053, '状态修改', 110, 5, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:changeStatus', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1054, '任务导出', 110, 6, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'monitor:job:export', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1055, '生成查询', 116, 1, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:query', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1056, '生成修改', 116, 2, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:edit', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1057, '生成删除', 116, 3, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:remove', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1058, '导入代码', 116, 4, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:import', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1059, '预览代码', 116, 5, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:preview', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1060, '生成代码', 116, 6, '#', NULL, NULL, 1, NULL, 'F', '0', '0', 'tool:gen:code', '#', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2008, '用户管理', 0, NULL, 'user', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'cascader', 'admin', '2024-02-27', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2009, '用户列表', 2008, 1, 'user', 'user/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:query', 'checkbox', 'admin', '2024-02-27', 'admin', '2024-10-28', NULL);
INSERT INTO `sys_menu` VALUES (2022, '游戏管理', 0, 6, 'pc28', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'color', 'admin', '2024-10-19', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2023, '游戏赔率设置', 2022, 1, 'gamesetup', 'pc28/gamesetup/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:gameOddsList', 'color', 'admin', '2024-10-19', 'admin', '2024-10-28', NULL);
INSERT INTO `sys_menu` VALUES (2024, '游戏开奖记录', 2022, 2, 'gamerecords', 'pc28/gamerecords/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:gameRecordList', 'date-range', 'admin', '2024-10-19', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2026, '财务报表', 0, 7, 'financialstatements', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'color', 'admin', '2024-10-20', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2027, '报表', 2026, 1, 'reportforms', 'financialstatements/reportforms/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:financialStatementList', 'color', 'admin', '2024-10-20', 'admin', '2024-10-28', NULL);
INSERT INTO `sys_menu` VALUES (2028, '管理台日志', 0, 9, 'log', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'checkbox', 'admin', '2024-10-20', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2029, '日志记录列表', 2028, 2, 'logList', 'log/logList/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:logList', 'color', 'admin', '2024-10-20', 'admin', '2024-10-28', NULL);
INSERT INTO `sys_menu` VALUES (2030, '交易记录', 0, 1, 'withdrawal', 'wallet/withdrawal/index', NULL, 1, NULL, 'M', '1', '0', 'system:tguser:withdrawalRecordList', 'checkbox', 'admin', '2024-10-20', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2032, '交易记录', 2030, 2, 'withdrawal', 'wallet/withdrawal/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:withdrawalRecordList', 'checkbox', 'admin', '2024-10-20', 'admin', '2024-11-10', NULL);
INSERT INTO `sys_menu` VALUES (2033, '统计图表', 0, 4, 'statistics', 'statistics/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:totalBalance', 'component', 'admin', '2024-10-20', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2038, '修改备注', 2009, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:promoteUsers', '#', 'admin', '2024-10-28', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2039, '游戏配置设置', 2023, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:gameOddsSetting', '#', 'admin', '2024-10-28', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2046, '添加彩金', 2009, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:addCjActivity', '#', 'admin', '2024-11-10', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2047, '添加活动用户', 2009, 4, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:addActivity', '#', 'admin', '2024-11-10', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2048, '取消活动用户', 2009, 5, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:delActivity', '#', 'admin', '2024-11-10', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2049, '标记打款', 2032, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:markPayment', '#', 'admin', '2024-11-10', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2050, '添加积分', 2009, 1, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:addCjActivityJf', '#', 'admin', '2024-11-12', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2053, '充值记录', 2030, NULL, 'topUpIndex', 'wallet/withdrawal/topUpIndex', NULL, 1, NULL, 'C', '0', '0', NULL, 'money', 'admin', '2024-11-15', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2054, '申请提现', 2030, 2, 'withdrawalIndex', 'wallet/withdrawal/withdrawIndex', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:withdrawalRecordList', '#', 'admin', '2024-11-15', 'admin', '2024-11-15', NULL);
INSERT INTO `sys_menu` VALUES (2061, '交易管理', 0, 1, 'bonus', NULL, NULL, 1, NULL, 'M', '0', '0', NULL, 'online', 'admin', '2024-11-15', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2062, '彩金提现记录', 2061, 3, 'convert', 'bonus/record', NULL, 1, NULL, 'C', '0', '0', NULL, 'job', 'admin', '2024-11-15', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2063, '彩金申请记录', 2061, 2, 'application', 'bonus/application', NULL, 1, NULL, 'C', '0', '0', NULL, 'eye-open', 'admin', '2024-11-15', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2067, '开业活动', 2009, 2, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:addCjActivity2', '#', 'admin', '2024-11-17', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2068, '首充值返现', 2009, 3, NULL, NULL, NULL, 1, NULL, 'F', '0', '0', 'system:tguser:addCjActivity3', '#', 'admin', '2024-11-17', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2069, '反水记录', 2022, 4, 'defect', 'pc28/defect', NULL, 1, NULL, 'C', '0', '0', NULL, 'clipboard', 'admin', '2024-11-18', 'admin', '2024-11-19', NULL);
INSERT INTO `sys_menu` VALUES (2070, '提现申请', 2061, 1, 'withdrawal/application', 'wallet/withdrawal/application', NULL, 1, NULL, 'C', '0', '0', NULL, '#', 'admin', '2024-11-18', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2071, '提现记录', 2061, 1, 'withdrawal/record', 'wallet/withdrawal/record', NULL, 1, NULL, 'C', '0', '0', NULL, '#', 'admin', '2024-11-18', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2072, '彩金发放记录', 2061, 4, 'giveBonus', 'bonus/giveBonus', NULL, 1, NULL, 'C', '0', '0', NULL, 'post', 'admin', '2024-11-18', 'admin', '2024-11-19', NULL);
INSERT INTO `sys_menu` VALUES (2073, '充值列表', 2061, NULL, 'topUpRecord', 'bonus/topUpRecord', NULL, 1, NULL, 'C', '0', '0', NULL, '#', 'admin', '2024-11-18', 'admin', '2024-11-18', NULL);
INSERT INTO `sys_menu` VALUES (2074, '活动管理', 2008, 2, 'activityUser', 'user/activityUser', NULL, 1, NULL, 'C', '0', '0', NULL, 'checkbox', 'admin', '2024-11-19', 'admin', '2024-11-19', NULL);
INSERT INTO `sys_menu` VALUES (2075, '用户游戏记录', 2022, 3, 'userbetting', 'pc28/userbetting/index', NULL, 1, NULL, 'C', '0', '0', 'system:tguser:userBettingList', 'date', 'admin', '2024-11-19', 'admin', '2024-11-20', NULL);

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `notice_id` int(11) NULL DEFAULT NULL,
  `notice_titl` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `notice_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `notice_cont` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (4, '123', '2', '<p>123123213123</p>', '0', 'admin', '2024-02-21', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_oper_log`;
CREATE TABLE `sys_oper_log`  (
  `oper_id` bigint(20) NULL DEFAULT NULL,
  `title` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `business_ty` int(11) NULL DEFAULT NULL,
  `method` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `request_met` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `operator_ty` int(11) NULL DEFAULT NULL,
  `oper_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `oper_url` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `oper_ip` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `oper_locati` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `oper_param` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `json_result` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `error_msg` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `oper_time` date NULL DEFAULT NULL,
  `cost_time` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_oper_log
-- ----------------------------
INSERT INTO `sys_oper_log` VALUES (400, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:40:19\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2028,2029,2030,2031,2032,2033,2008,2009,2043,2042,2022,2023,2024,2025,2026,2027],\"params\":{},\"roleI', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 30);
INSERT INTO `sys_oper_log` VALUES (401, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"7110\",\"nickName\":\"7110\",\"params\":{},\"phonenumber\":\"7110\",\"postIds\":[3],\"roleIds\":[102],\"sex\":\"1\",\"status\":\"0\",\"userId\":111,\"userName\":\"niujs\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 182);
INSERT INTO `sys_oper_log` VALUES (402, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"8110\",\"nickName\":\"8110\",\"params\":{},\"phonenumber\":\"8110\",\"postIds\":[3],\"roleIds\":[103],\"sex\":\"0\",\"status\":\"0\",\"userId\":112,\"userName\":\"hoshimi\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 139);
INSERT INTO `sys_oper_log` VALUES (403, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"7321\",\"nickName\":\"7321\",\"params\":{},\"phonenumber\":\"7321\",\"postIds\":[2],\"roleIds\":[103],\"sex\":\"1\",\"status\":\"0\",\"userId\":113,\"userName\":\"lantian\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 181);
INSERT INTO `sys_oper_log` VALUES (404, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"7654\",\"nickName\":\"7654\",\"params\":{},\"phonenumber\":\"7654\",\"postIds\":[2],\"roleIds\":[103],\"sex\":\"1\",\"status\":\"0\",\"userId\":114,\"userName\":\"nanfeng\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 181);
INSERT INTO `sys_oper_log` VALUES (405, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.231.84.5', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"8652\",\"nickName\":\"8652\",\"params\":{},\"phonenumber\":\"8652\",\"postIds\":[2],\"roleIds\":[103],\"sex\":\"0\",\"status\":\"0\",\"userId\":115,\"userName\":\"rona\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 152);
INSERT INTO `sys_oper_log` VALUES (406, '用户管理', 3, 'com.ruoyi.web.controller.system.SysUserController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/user/110', '103.231.84.6', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 24);
INSERT INTO `sys_oper_log` VALUES (407, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.231.84.4', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":true,\"menuIds\":[2030,2032,2026,2027],\"params\":{},\"roleId\":102,\"roleKey\":\"finance\",\"roleName\":\"财务\",\"roleSort\":2,\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-28', 29);
INSERT INTO `sys_oper_log` VALUES (408, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '98.98.195.251', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"admin\",\"createTime\":\"2024-10-28 12:46:57\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"emai', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 39);
INSERT INTO `sys_oper_log` VALUES (409, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'daqian', 'VIP', '/system/user', '51.158.206.14', 'XX XX', '{\"admin\":false,\"createBy\":\"daqian\",\"deptId\":100,\"email\":\"lhc\",\"nickName\":\"令狐冲\",\"params\":{},\"postIds\":[],\"roleIds\":[103],\"status\":\"0\",\"userId\":116,\"userName\":\"lhc\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 213);
INSERT INTO `sys_oper_log` VALUES (410, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'daqian', 'VIP', '/system/user', '51.158.206.14', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-10-28 17:07:34\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"ema', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 32);
INSERT INTO `sys_oper_log` VALUES (411, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '103.97.2.77', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-10-28 17:07:34\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"ema', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 41);
INSERT INTO `sys_oper_log` VALUES (412, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '103.97.2.77', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-10-28 17:07:34\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"ema', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 35);
INSERT INTO `sys_oper_log` VALUES (413, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.80', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,100,1000,1001,1002,1003,1004,1005,1006,101,1007,1008,1009,1010,1011,500,1039,1041,501,1042,1044,2', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 76);
INSERT INTO `sys_oper_log` VALUES (414, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '101.44.82.217', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,2030,100,1000,101,1007,108,500,1039,1041,2028,2029,2031,2032,2033,2008,2009,2043,2042,2022,2023,2', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 30);
INSERT INTO `sys_oper_log` VALUES (415, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '101.44.82.217', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,100,1000,1001,1002,1003,1004,1005,1006,101,1007,1008,1009,1010,1011,108,500,1039,1041,501,1042,10', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 35);
INSERT INTO `sys_oper_log` VALUES (416, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '101.44.82.217', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:40:19\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,108,500,1039,1041,501,1042,1044,2028,2029,2030,2031,2032,2033,2008,2009,2043,2042,2022,2023,2024,', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 20);
INSERT INTO `sys_oper_log` VALUES (417, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '101.44.82.217', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"admin\",\"createTime\":\"2024-10-28 12:46:57\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"emai', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-10-29', 44);
INSERT INTO `sys_oper_log` VALUES (418, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.81', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[],\"params\":{},\"roleId\":102,\"roleKey\":\"finance\",\"roleName\":\"财务\",\"roleSort\":2,\"status\":\"0\",\"updat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 78);
INSERT INTO `sys_oper_log` VALUES (419, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.81', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[],\"params\":{},\"roleId\":102,\"roleKey\":\"finance\",\"roleName\":\"财务\",\"roleSort\":2,\"status\":\"0\",\"updat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 29);
INSERT INTO `sys_oper_log` VALUES (420, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.81', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[],\"params\":{},\"roleId\":101,\"roleKey\":\"system\",\"roleName\":\"vip\",\"roleSort\":1,\"status\":\"0\",\"updateBy\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 31);
INSERT INTO `sys_oper_log` VALUES (421, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.81', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[],\"params\":{},\"roleId\":102,\"roleKey\":\"finance\",\"roleName\":\"财务\",\"roleSort\":2,\"status\":\"0\",\"updat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 29);
INSERT INTO `sys_oper_log` VALUES (422, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.81', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:40:19\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[],\"params\":{},\"roleId\":103,\"roleKey\":\"observer\",\"roleName\":\"股东观察者\",\"roleSort\":0,\"status\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 29);
INSERT INTO `sys_oper_log` VALUES (423, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2031', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 19);
INSERT INTO `sys_oper_log` VALUES (424, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2043', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"存在子菜单,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-10', 7);
INSERT INTO `sys_oper_log` VALUES (425, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2044', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 18);
INSERT INTO `sys_oper_log` VALUES (426, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2045', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 17);
INSERT INTO `sys_oper_log` VALUES (427, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2043', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 17);
INSERT INTO `sys_oper_log` VALUES (428, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2042', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 18);
INSERT INTO `sys_oper_log` VALUES (429, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2025', '103.97.2.81', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 19);
INSERT INTO `sys_oper_log` VALUES (430, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"createTime\":\"2024-10-20 08:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"wallet\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visib', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 36);
INSERT INTO `sys_oper_log` VALUES (431, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 08:18:47\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2032,\"menuName\":\"交易记录\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"withdrawal\",\"per', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 17);
INSERT INTO `sys_oper_log` VALUES (432, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"添加彩金\",\"menuType\":\"F\",\"orderNum\":3,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:addCjActivity\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 18);
INSERT INTO `sys_oper_log` VALUES (433, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"添加活动用户\",\"menuType\":\"F\",\"orderNum\":4,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:addActivity\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 18);
INSERT INTO `sys_oper_log` VALUES (434, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"取消活动用户\",\"menuType\":\"F\",\"orderNum\":5,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:delActivity\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 15);
INSERT INTO `sys_oper_log` VALUES (435, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '103.97.2.78', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"标记打款\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2032,\"perms\":\"system:tguser:markPayment\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 15);
INSERT INTO `sys_oper_log` VALUES (436, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:40:19\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,108,500,1039,1041,2028,2029,2030,2032,2033,2008,2009,2022,2024,2026,2027],\"params\":{},\"roleId\":10', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 48);
INSERT INTO `sys_oper_log` VALUES (437, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,100,1000,1001,1002,1003,1004,1005,1006,108,500,1039,1041,501,1042,1044,2028,2029,2030,2032,2049,2', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 43);
INSERT INTO `sys_oper_log` VALUES (438, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.97.2.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:39:22\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,108,500,1039,1041,2028,2029,2030,2032,2049,2033,2008,2009,2038,2046,2047,2048,2022,2023,2039,2024', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 49);
INSERT INTO `sys_oper_log` VALUES (439, '角色管理', 1, 'com.ruoyi.web.controller.system.SysRoleController.add()', 'POST', 1, 'admin', '研发部门', '/system/role', '103.97.2.78', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptCheckStrictly\":true,\"deptIds\":[],\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,100,1000,2028,2029,2030,2032,2049,2033,2008,2009,2038,2046,2047,2048,2022,2023,2039,2024,2026,2027],\"params\":{},\"roleId\":104,\"role', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 41);
INSERT INTO `sys_oper_log` VALUES (440, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'daqian', 'VIP', '/system/user', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', '{\"admin\":false,\"createBy\":\"daqian\",\"deptId\":101,\"email\":\"1031\",\"nickName\":\"小鬼\",\"params\":{},\"phonenumber\":\"1031\",\"postIds\":[2],\"remark\":\"客服经理\",\"roleIds\":[104],\"sex\":\"0\",\"status\":\"0\",\"userId\":117,\"userName\":\" xiaogui\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 179);
INSERT INTO `sys_oper_log` VALUES (441, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.resetPwd()', 'PUT', 1, 'daqian', 'VIP', '/system/user/resetPwd', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', '{\"admin\":false,\"params\":{},\"updateBy\":\"daqian\",\"userId\":117}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 177);
INSERT INTO `sys_oper_log` VALUES (442, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'daqian', 'VIP', '/system/user', '2001:bc8:17c0:514:7ec2:55ff:feac:63e6', '内网IP', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-11-09 19:33:22\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0,100\",\"children\":[],\"deptId\":101,\"deptName\":\"管理部门\",\"leader\":\"代清阳1\",\"orderNum\":1,\"params\":{},\"parentId\":100,\"status\":\"0\"},\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 51);
INSERT INTO `sys_oper_log` VALUES (443, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '103.97.2.77', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-11-09 19:33:22\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0,100\",\"children\":[],\"deptId\":101,\"deptName\":\"管理部门\",\"leader\":\"代清阳1\",\"orderNum\":1,\"params\":{},\"parentId\":100,\"status\":\"0\"},\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 47);
INSERT INTO `sys_oper_log` VALUES (444, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.resetPwd()', 'PUT', 1, 'admin', '研发部门', '/system/user/resetPwd', '103.97.2.77', 'XX XX', '{\"admin\":false,\"params\":{},\"updateBy\":\"admin\",\"userId\":117}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 176);
INSERT INTO `sys_oper_log` VALUES (445, '用户管理', 3, 'com.ruoyi.web.controller.system.SysUserController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/user/117', '103.97.2.77', 'XX XX', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 29);
INSERT INTO `sys_oper_log` VALUES (446, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '103.97.2.77', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":101,\"email\":\"7063\",\"nickName\":\"xiaogui\",\"params\":{},\"phonenumber\":\"694411\",\"postIds\":[4],\"roleIds\":[104],\"sex\":\"1\",\"status\":\"0\",\"userId\":118,\"userName\":\"xiaogui\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 194);
INSERT INTO `sys_oper_log` VALUES (447, '个人信息', 2, 'com.ruoyi.web.controller.system.SysProfileController.updatePwd()', 'PUT', 1, 'xiaogui', '管理部门', '/system/user/profile/updatePwd', '2408:8471:10a:f55d:9d05:f7de:86a2:6a14', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 391);
INSERT INTO `sys_oper_log` VALUES (448, '个人信息', 2, 'com.ruoyi.web.controller.system.SysProfileController.updatePwd()', 'PUT', 1, 'xiaogui', '管理部门', '/system/user/profile/updatePwd', '123.138.183.38', 'XX XX', '{}', '{\"msg\":\"修改密码失败，旧密码错误\",\"code\":500}', NULL, NULL, '2024-11-10', 159);
INSERT INTO `sys_oper_log` VALUES (449, '个人信息', 2, 'com.ruoyi.web.controller.system.SysProfileController.updateProfile()', 'PUT', 1, 'xiaogui', '管理部门', '/system/user/profile', '2408:8471:10a:f55d:9d05:f7de:86a2:6a14', '内网IP', '{\"admin\":false,\"email\":\"7063\",\"nickName\":\"xiaogui\",\"params\":{},\"phonenumber\":\"694411\",\"sex\":\"1\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-10', 31);
INSERT INTO `sys_oper_log` VALUES (450, '字典类型', 1, 'com.ruoyi.web.controller.system.SysDictTypeController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"dictName\":\"交易类型\",\"dictType\":\"payment_type\",\"params\":{},\"remark\":\"订单交易类型\",\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 490);
INSERT INTO `sys_oper_log` VALUES (451, '字典类型', 2, 'com.ruoyi.web.controller.system.SysDictTypeController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:13:41\",\"dictId\":11,\"dictName\":\"订单交易类型\",\"dictType\":\"payment_type\",\"params\":{},\"remark\":\"订单交易类型\",\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 1360);
INSERT INTO `sys_oper_log` VALUES (452, '字典类型', 2, 'com.ruoyi.web.controller.system.SysDictTypeController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:13:41\",\"dictId\":11,\"dictName\":\"订单交易类型\",\"dictType\":\"payment_type\",\"params\":{},\"remark\":\"订单交易类型\",\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 1402);
INSERT INTO `sys_oper_log` VALUES (453, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"全部\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"0\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 470);
INSERT INTO `sys_oper_log` VALUES (454, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"充值\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"1\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 528);
INSERT INTO `sys_oper_log` VALUES (455, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"上注\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"2\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 479);
INSERT INTO `sys_oper_log` VALUES (456, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"申请提现\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"3\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 494);
INSERT INTO `sys_oper_log` VALUES (457, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"反水\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"4\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 736);
INSERT INTO `sys_oper_log` VALUES (458, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"中奖\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"5\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 448);
INSERT INTO `sys_oper_log` VALUES (459, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"取消上注\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"6\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 465);
INSERT INTO `sys_oper_log` VALUES (460, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"彩金提现\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"7\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 566);
INSERT INTO `sys_oper_log` VALUES (461, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"提现打款记录\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"8\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 605);
INSERT INTO `sys_oper_log` VALUES (462, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"彩金打款记录\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"9\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-11', 531);
INSERT INTO `sys_oper_log` VALUES (463, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '103.231.84.6', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"添加积分\",\"menuType\":\"F\",\"orderNum\":1,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:addCjActivityJf\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-12', 54);
INSERT INTO `sys_oper_log` VALUES (464, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '103.231.84.6', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[1,100,1000,2028,2029,2030,2032,2049,2033,2008,2009,2050,2038,2046,2047,2048,2022,2023,2039,2024,202', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-12', 82);
INSERT INTO `sys_oper_log` VALUES (465, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/withdrawIndex\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"提现\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawIndex\",\"p', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 324);
INSERT INTO `sys_oper_log` VALUES (466, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2030', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"存在子菜单,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-15', 123);
INSERT INTO `sys_oper_log` VALUES (467, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"提现\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawIndex\",\"perms\":\"w', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 341);
INSERT INTO `sys_oper_log` VALUES (468, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"提现\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawIndex\",\"perms\":\"s', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 332);
INSERT INTO `sys_oper_log` VALUES (469, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"提现\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal\",\"perms\":\"syst', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 327);
INSERT INTO `sys_oper_log` VALUES (470, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"交易记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal\",\"perms\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 314);
INSERT INTO `sys_oper_log` VALUES (471, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"222\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2032,\"path\":\"2\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 363);
INSERT INTO `sys_oper_log` VALUES (472, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2051', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 429);
INSERT INTO `sys_oper_log` VALUES (473, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"333\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"1\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 302);
INSERT INTO `sys_oper_log` VALUES (474, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 14:31:44\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2052,\"menuName\":\"333\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"1\",\"perms\":\"system:tguser:markPayment\",\"status\":\"0\",\"updateBy\":\"admin\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 318);
INSERT INTO `sys_oper_log` VALUES (475, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 14:31:44\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2052,\"menuName\":\"标记打款\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"1\",\"perms\":\"system:tguser:markPayment\",\"status\":\"0\",\"updateBy', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 315);
INSERT INTO `sys_oper_log` VALUES (476, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-10 03:25:38\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2049,\"menuName\":\"标记打款\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2032,\"path\":\"\",\"perms\":\"system:tguser:markPayment\",\"status\":\"0\",\"updateBy\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 331);
INSERT INTO `sys_oper_log` VALUES (477, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 14:31:44\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2052,\"menuName\":\"标记打款\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"1\",\"perms\":\"system:tguser:markPayment\",\"status\":\"0\",\"updateBy', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 367);
INSERT INTO `sys_oper_log` VALUES (478, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2049', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-15', 225);
INSERT INTO `sys_oper_log` VALUES (479, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2049', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-15', 193);
INSERT INTO `sys_oper_log` VALUES (480, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2049', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-15', 206);
INSERT INTO `sys_oper_log` VALUES (481, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"充值记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2030,\"path\":\"2\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 300);
INSERT INTO `sys_oper_log` VALUES (482, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/topUpIndex\",\"createTime\":\"2024-11-15 14:33:48\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2053,\"menuName\":\"充值记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2030,\"path\":\"topUpIndex\",\"perms', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 434);
INSERT INTO `sys_oper_log` VALUES (483, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/topUpIndex\",\"createTime\":\"2024-11-15 14:33:48\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2053,\"menuName\":\"充值记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2030,\"path\":\"topUpIndex\",\"p', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 332);
INSERT INTO `sys_oper_log` VALUES (484, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"申请提现\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"withdrawalIndex\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 292);
INSERT INTO `sys_oper_log` VALUES (485, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2052', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 442);
INSERT INTO `sys_oper_log` VALUES (486, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/withdrawIndex\",\"createTime\":\"2024-11-15 14:36:35\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2054,\"menuName\":\"申请提现\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"withdrawalIndex', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 359);
INSERT INTO `sys_oper_log` VALUES (487, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/withdrawIndex\",\"createTime\":\"2024-11-15 14:36:35\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2054,\"menuName\":\"申请提现\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2030,\"path\":\"withdrawalIndex', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 336);
INSERT INTO `sys_oper_log` VALUES (488, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"交易记录\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal\",\"perms\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 311);
INSERT INTO `sys_oper_log` VALUES (489, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"充值\",\"menuType\":\"M\",\"orderNum\":2,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 331);
INSERT INTO `sys_oper_log` VALUES (490, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2023-03-27 18:17:29\",\"icon\":\"system\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":1,\"menuName\":\"系统管理\",\"menuType\":\"M\",\"orderNum\":10,\"params\":{},\"parentId\":0,\"path\":\"system\",\"perms\":\"\",\"query\":\"\",\"status\":\"0\",\"updateBy\":\"admin\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 300);
INSERT INTO `sys_oper_log` VALUES (491, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-10-20 16:08:04\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2028,\"menuName\":\"管理台日志\",\"menuType\":\"M\",\"orderNum\":9,\"params\":{},\"parentId\":0,\"path\":\"log\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visib', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 345);
INSERT INTO `sys_oper_log` VALUES (492, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:28:08\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2055,\"menuName\":\"充值\",\"menuType\":\"M\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 289);
INSERT INTO `sys_oper_log` VALUES (493, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-02-27 21:00:06\",\"icon\":\"cascader\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2008,\"menuName\":\"用户管理\",\"menuType\":\"M\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"path\":\"user\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 321);
INSERT INTO `sys_oper_log` VALUES (494, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:28:08\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2055,\"menuName\":\"充值\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 334);
INSERT INTO `sys_oper_log` VALUES (495, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/index\",\"createTime\":\"2024-10-20 16:16:57\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2030,\"menuName\":\"交易记录\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal\",\"perms\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 380);
INSERT INTO `sys_oper_log` VALUES (496, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"statistics/index\",\"createTime\":\"2024-10-20 16:43:04\",\"icon\":\"component\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2033,\"menuName\":\"统计图表\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":0,\"path\":\"statistics\",\"perms\":\"syst', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 327);
INSERT INTO `sys_oper_log` VALUES (497, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2023-03-27 18:17:29\",\"icon\":\"tool\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":3,\"menuName\":\"系统工具\",\"menuType\":\"M\",\"orderNum\":8,\"params\":{},\"parentId\":0,\"path\":\"tool\",\"perms\":\"\",\"query\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"vis', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 336);
INSERT INTO `sys_oper_log` VALUES (498, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-10-20 13:30:41\",\"icon\":\"color\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2026,\"menuName\":\"财务报表\",\"menuType\":\"M\",\"orderNum\":7,\"params\":{},\"parentId\":0,\"path\":\"financialstatements\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"adm', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 325);
INSERT INTO `sys_oper_log` VALUES (499, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-10-19 17:10:11\",\"icon\":\"color\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2022,\"menuName\":\"游戏管理\",\"menuType\":\"M\",\"orderNum\":6,\"params\":{},\"parentId\":0,\"path\":\"pc28\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 325);
INSERT INTO `sys_oper_log` VALUES (500, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2023-03-27 18:17:29\",\"icon\":\"monitor\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2,\"menuName\":\"系统监控\",\"menuType\":\"M\",\"orderNum\":5,\"params\":{},\"parentId\":0,\"path\":\"monitor\",\"perms\":\"\",\"query\":\"\",\"status\":\"0\",\"updateBy\":\"admin', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 294);
INSERT INTO `sys_oper_log` VALUES (501, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:28:08\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2055,\"menuName\":\"充值\",\"menuType\":\"M\",\"orderNum\":2,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 352);
INSERT INTO `sys_oper_log` VALUES (502, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"topUp/index.vue\",\"createBy\":\"admin\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"充值管理\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2055,\"path\":\"index\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 320);
INSERT INTO `sys_oper_log` VALUES (503, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:28:08\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2055,\"menuName\":\"充值管理\",\"menuType\":\"M\",\"orderNum\":2,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 311);
INSERT INTO `sys_oper_log` VALUES (504, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"提现管理\",\"menuType\":\"M\",\"orderNum\":3,\"params\":{},\"parentId\":0,\"path\":\"wallet/withdrawal\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 332);
INSERT INTO `sys_oper_log` VALUES (505, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"statistics/index\",\"createTime\":\"2024-10-20 16:43:04\",\"icon\":\"component\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2033,\"menuName\":\"统计图表\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":0,\"path\":\"statistics\",\"perms\":\"syst', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 344);
INSERT INTO `sys_oper_log` VALUES (506, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:35:53\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2057,\"menuName\":\"提现管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"wallet/withdrawal\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 325);
INSERT INTO `sys_oper_log` VALUES (507, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:28:08\",\"icon\":\"money\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2055,\"menuName\":\"充值管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"topUp\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 335);
INSERT INTO `sys_oper_log` VALUES (508, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/record\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"提现记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2057,\"path\":\"record\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 310);
INSERT INTO `sys_oper_log` VALUES (509, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:35:53\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2057,\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"application\",\"per', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 307);
INSERT INTO `sys_oper_log` VALUES (510, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:35:53\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2057,\"menuName\":\"提现管理\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/wallet/withdrawa', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 304);
INSERT INTO `sys_oper_log` VALUES (511, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"111\",\"menuType\":\"M\",\"orderNum\":2,\"params\":{},\"parentId\":2058,\"path\":\"2\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 304);
INSERT INTO `sys_oper_log` VALUES (512, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2059', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 384);
INSERT INTO `sys_oper_log` VALUES (513, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2057,\"path\":\"application\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 354);
INSERT INTO `sys_oper_log` VALUES (514, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:35:53\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2057,\"menuName\":\"提现管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/wallet/withdrawa', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 337);
INSERT INTO `sys_oper_log` VALUES (515, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/record\",\"createTime\":\"2024-11-15 15:37:17\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2058,\"menuName\":\"提现记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2057,\"path\":\"/wallet/withdrawal/rec', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 465);
INSERT INTO `sys_oper_log` VALUES (516, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:40:38\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2060,\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2057,\"path\":\"/wallet/withdrawa', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 299);
INSERT INTO `sys_oper_log` VALUES (517, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"\",\"createTime\":\"2024-11-15 15:35:53\",\"icon\":\"icon\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2057,\"menuName\":\"提现管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/wallet/withdrawal\",\"perms\":\"\",\"status\":\"0\",\"u', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 301);
INSERT INTO `sys_oper_log` VALUES (518, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createBy\":\"admin\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"彩金反水管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/bonus\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 333);
INSERT INTO `sys_oper_log` VALUES (519, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/convert\",\"createBy\":\"admin\",\"icon\":\"job\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"彩金管理\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"convert\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 440);
INSERT INTO `sys_oper_log` VALUES (520, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"反水管理\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 306);
INSERT INTO `sys_oper_log` VALUES (521, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"反水管理\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"perms\":\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-15', 333);
INSERT INTO `sys_oper_log` VALUES (522, '字典类型', 1, 'com.ruoyi.web.controller.system.SysDictTypeController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"dictName\":\"打款状态\",\"dictType\":\"make_payment_type\",\"params\":{},\"remark\":\"打款状态\\n\",\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 535);
INSERT INTO `sys_oper_log` VALUES (523, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"已打款\",\"dictSort\":0,\"dictType\":\"make_payment_type\",\"dictValue\":\"0\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 561);
INSERT INTO `sys_oper_log` VALUES (524, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"未打款\",\"dictSort\":0,\"dictType\":\"make_payment_type\",\"dictValue\":\"1\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 807);
INSERT INTO `sys_oper_log` VALUES (525, '字典类型', 3, 'com.ruoyi.web.controller.system.SysDictTypeController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/dict/type/12', '127.0.0.1', '内网IP', '{}', NULL, 1, '打款状态已分配,不能删除', '2024-11-16', 349);
INSERT INTO `sys_oper_log` VALUES (526, '字典类型', 2, 'com.ruoyi.web.controller.system.SysDictTypeController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-16 00:04:40\",\"dictId\":12,\"dictName\":\"打款状态\",\"dictType\":\"make_payment_type\",\"params\":{},\"remark\":\"打款状态\\n\",\"status\":\"1\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 1155);
INSERT INTO `sys_oper_log` VALUES (527, '字典类型', 3, 'com.ruoyi.web.controller.system.SysDictTypeController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/dict/type/12', '127.0.0.1', '内网IP', '{}', NULL, 1, '打款状态已分配,不能删除', '2024-11-16', 252);
INSERT INTO `sys_oper_log` VALUES (528, '字典类型', 3, 'com.ruoyi.web.controller.system.SysDictDataController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/dict/data/41', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 1377);
INSERT INTO `sys_oper_log` VALUES (529, '字典类型', 3, 'com.ruoyi.web.controller.system.SysDictDataController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/dict/data/40', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 662);
INSERT INTO `sys_oper_log` VALUES (530, '字典类型', 3, 'com.ruoyi.web.controller.system.SysDictTypeController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/dict/type/12', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 871);
INSERT INTO `sys_oper_log` VALUES (531, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"彩金申请\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"perms\":\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 959);
INSERT INTO `sys_oper_log` VALUES (532, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"彩金申请提现\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"pe', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 636);
INSERT INTO `sys_oper_log` VALUES (533, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/convert\",\"createTime\":\"2024-11-15 15:53:38\",\"icon\":\"job\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2062,\"menuName\":\"彩金提现记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"convert\",\"perms\":\"\",\"stat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 474);
INSERT INTO `sys_oper_log` VALUES (534, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"彩金申请提现\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"pe', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 327);
INSERT INTO `sys_oper_log` VALUES (535, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/convert\",\"createTime\":\"2024-11-15 15:53:38\",\"icon\":\"job\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2062,\"menuName\":\"彩金提现记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"convert\",\"perms\":\"\",\"stat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 358);
INSERT INTO `sys_oper_log` VALUES (536, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/record\",\"createTime\":\"2024-11-15 15:37:17\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2058,\"menuName\":\"提现记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2057,\"path\":\"/wallet/withdrawal/rec', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 424);
INSERT INTO `sys_oper_log` VALUES (537, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:40:38\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2060,\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2057,\"path\":\"/wallet/withdrawa', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 408);
INSERT INTO `sys_oper_log` VALUES (538, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/record\",\"createTime\":\"2024-11-15 15:53:38\",\"icon\":\"job\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2062,\"menuName\":\"彩金提现记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"convert\",\"perms\":\"\",\"statu', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 405);
INSERT INTO `sys_oper_log` VALUES (539, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"中奖记录\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"bonus/application\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 395);
INSERT INTO `sys_oper_log` VALUES (540, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/cancelTop\",\"createTime\":\"2024-11-16 01:36:13\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2064,\"menuName\":\"取消上注\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"cancelTop\",\"perms\":\"\",\"status\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 407);
INSERT INTO `sys_oper_log` VALUES (541, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/winningLottery\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"中奖记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":2061,\"path\":\"winningLottery\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 508);
INSERT INTO `sys_oper_log` VALUES (542, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/defect\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"反水记录\",\"menuType\":\"C\",\"orderNum\":5,\"params\":{},\"parentId\":2061,\"path\":\"defect\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-16', 349);
INSERT INTO `sys_oper_log` VALUES (543, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '160.30.128.101', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2046,2047,2048,2030,2032,2049,2055,2056,2033,2022,2023,2039,2024,2026,2027,2028', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 94);
INSERT INTO `sys_oper_log` VALUES (544, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '101.44.83.234', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2046,2047,2048,2030,2032,2049,2055,2056,2057,2060,2058,2061,2063,2062,2064,2065,2066', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 55);
INSERT INTO `sys_oper_log` VALUES (545, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '160.30.128.105', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"开业活动\",\"menuType\":\"F\",\"orderNum\":2,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:addCjActivity2\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 54);
INSERT INTO `sys_oper_log` VALUES (546, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '160.30.128.105', 'XX XX', '{\"children\":[],\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"首充值返现\",\"menuType\":\"F\",\"orderNum\":3,\"params\":{},\"parentId\":2009,\"perms\":\"system:tguser:addCjActivity3\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 26);
INSERT INTO `sys_oper_log` VALUES (547, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '160.30.128.105', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2033,2022,2023,2039,2024,2026', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 86);
INSERT INTO `sys_oper_log` VALUES (548, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '160.30.128.105', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2057,2060,2058,2061,2063,2062,2064', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-17', 60);
INSERT INTO `sys_oper_log` VALUES (549, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2064', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 376);
INSERT INTO `sys_oper_log` VALUES (550, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/cancelTop\",\"createTime\":\"2024-11-16 01:36:13\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2064,\"menuName\":\"取消上注\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"cancelTop\",\"perms\":\"\",\"status\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 281);
INSERT INTO `sys_oper_log` VALUES (551, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2064', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 191);
INSERT INTO `sys_oper_log` VALUES (552, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/cancelTop\",\"createTime\":\"2024-11-16 01:36:13\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2064,\"menuName\":\"取消上注\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"cancelTop\",\"perms\":\"\",\"status\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 273);
INSERT INTO `sys_oper_log` VALUES (553, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2064', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 191);
INSERT INTO `sys_oper_log` VALUES (554, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2065', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 191);
INSERT INTO `sys_oper_log` VALUES (555, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/winningLottery\",\"createTime\":\"2024-11-16 01:37:57\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2065,\"menuName\":\"中奖记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"path\":\"winningLottery\",\"perms\":\"\",\"status\":\"1\",\"u', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 287);
INSERT INTO `sys_oper_log` VALUES (556, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2065', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 178);
INSERT INTO `sys_oper_log` VALUES (557, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2057,2060,2058,2061,2063,2062,2066', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 1016);
INSERT INTO `sys_oper_log` VALUES (558, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2064', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 380);
INSERT INTO `sys_oper_log` VALUES (559, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2065', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 369);
INSERT INTO `sys_oper_log` VALUES (560, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/bonus\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"admin\",\"visible', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 264);
INSERT INTO `sys_oper_log` VALUES (561, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2066', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 200);
INSERT INTO `sys_oper_log` VALUES (562, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"pc28/defect\",\"createBy\":\"admin\",\"icon\":\"clipboard\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"反水记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":2022,\"path\":\"defect\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 281);
INSERT INTO `sys_oper_log` VALUES (563, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2057,2060,2058,2061,2063,2062,2033', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 1105);
INSERT INTO `sys_oper_log` VALUES (564, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2066', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 364);
INSERT INTO `sys_oper_log` VALUES (565, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"pc28/gamerecords/index\",\"createTime\":\"2024-10-19 17:15:03\",\"icon\":\"date-range\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2024,\"menuName\":\"游戏开奖记录\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2022,\"path\":\"gamerecor', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 336);
INSERT INTO `sys_oper_log` VALUES (566, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"彩金申请提现\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"pe', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 277);
INSERT INTO `sys_oper_log` VALUES (567, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/record\",\"createTime\":\"2024-11-15 15:53:38\",\"icon\":\"job\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2062,\"menuName\":\"彩金提现记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":2061,\"path\":\"convert\",\"perms\":\"\",\"statu', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 291);
INSERT INTO `sys_oper_log` VALUES (568, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"withdrawal/application\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 230);
INSERT INTO `sys_oper_log` VALUES (569, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/record\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"提现记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal/record\",\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 710);
INSERT INTO `sys_oper_log` VALUES (570, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"bonus\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"a', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 237);
INSERT INTO `sys_oper_log` VALUES (571, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/record\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"提现记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"withdrawal/record\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 575);
INSERT INTO `sys_oper_log` VALUES (572, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2057', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"存在子菜单,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 114);
INSERT INTO `sys_oper_log` VALUES (573, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2060', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 170);
INSERT INTO `sys_oper_log` VALUES (574, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2060,2058,2061,2063,2062,2033,2022', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 1138);
INSERT INTO `sys_oper_log` VALUES (575, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2060', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 190);
INSERT INTO `sys_oper_log` VALUES (576, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2058', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"菜单已分配,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 173);
INSERT INTO `sys_oper_log` VALUES (577, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2055,2056,2061,2063,2062,2033,2022,2023,2039', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 904);
INSERT INTO `sys_oper_log` VALUES (578, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2060', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 323);
INSERT INTO `sys_oper_log` VALUES (579, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2058', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 306);
INSERT INTO `sys_oper_log` VALUES (580, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2057', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 339);
INSERT INTO `sys_oper_log` VALUES (581, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/application\",\"createTime\":\"2024-11-15 15:54:27\",\"icon\":\"eye-open\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2063,\"menuName\":\"彩金申请记录\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2061,\"path\":\"application\",\"pe', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 258);
INSERT INTO `sys_oper_log` VALUES (582, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/record\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"彩金发放记录\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":2061,\"path\":\"bonus/record\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 249);
INSERT INTO `sys_oper_log` VALUES (583, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/record\",\"createTime\":\"2024-11-18 15:33:28\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2072,\"menuName\":\"彩金发放记录\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":2061,\"path\":\"record\",\"perms\":\"\",\"status\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 260);
INSERT INTO `sys_oper_log` VALUES (584, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/record\",\"createTime\":\"2024-11-18 15:33:28\",\"icon\":\"post\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2072,\"menuName\":\"彩金发放记录\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":2061,\"path\":\"record\",\"perms\":\"\",\"statu', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 275);
INSERT INTO `sys_oper_log` VALUES (585, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-18 15:27:47\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2070,\"menuName\":\"提现申请\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":2061,\"path\":\"withdrawal/applic', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 255);
INSERT INTO `sys_oper_log` VALUES (586, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"充值记录\",\"menuType\":\"C\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"withdrawal/appl', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 229);
INSERT INTO `sys_oper_log` VALUES (587, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"充值记录\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"bonus\",\"perms\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 595);
INSERT INTO `sys_oper_log` VALUES (588, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"bonus\",\"perms\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 262);
INSERT INTO `sys_oper_log` VALUES (589, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/topUpRecord\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"充值记录\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"topUpRecord\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 247);
INSERT INTO `sys_oper_log` VALUES (590, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"/bonus\",\"perms\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 242);
INSERT INTO `sys_oper_log` VALUES (591, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"wallet/withdrawal/application\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"bonus\",\"perms\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 284);
INSERT INTO `sys_oper_log` VALUES (592, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"\",\"createTime\":\"2024-11-15 15:52:22\",\"icon\":\"online\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2061,\"menuName\":\"交易管理\",\"menuType\":\"M\",\"orderNum\":1,\"params\":{},\"parentId\":0,\"path\":\"bonus\",\"perms\":\"\",\"status\":\"0\",\"updateBy\":\"a', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 238);
INSERT INTO `sys_oper_log` VALUES (593, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2061,2063,2062,2033,2022,2023,2039,2024,2026', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 3453);
INSERT INTO `sys_oper_log` VALUES (594, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2023-09-19 15:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2032,2049,2061,2063,2062,2033,2022,2023,2039,2024,2026', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 920);
INSERT INTO `sys_oper_log` VALUES (595, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '127.0.0.1', '内网IP', '{\"admin\":false,\"createTime\":\"2024-11-10 03:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2030,2032,2049,2033,2022,2023,2039,2024,2026,2027,2028', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 925);
INSERT INTO `sys_oper_log` VALUES (596, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2055', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"存在子菜单,不允许删除\",\"code\":601}', NULL, NULL, '2024-11-18', 111);
INSERT INTO `sys_oper_log` VALUES (597, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2056', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 355);
INSERT INTO `sys_oper_log` VALUES (598, '菜单管理', 3, 'com.ruoyi.web.controller.system.SysMenuController.remove()', 'DELETE', 1, 'admin', '研发部门', '/system/menu/2055', '127.0.0.1', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 387);
INSERT INTO `sys_oper_log` VALUES (599, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/topUpRecord\",\"createTime\":\"2024-11-18 15:39:40\",\"icon\":\"#\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2073,\"menuName\":\"充值列表\",\"menuType\":\"C\",\"orderNum\":0,\"params\":{},\"parentId\":2061,\"path\":\"topUpRecord\",\"perms\":\"\",\"stat', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 268);
INSERT INTO `sys_oper_log` VALUES (600, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '43.252.208.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063,2062,2072', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 52);
INSERT INTO `sys_oper_log` VALUES (601, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '43.252.208.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063,2062,2072', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 68);
INSERT INTO `sys_oper_log` VALUES (602, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '43.252.208.78', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2038,2067,2046,2068,2047,2048,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063,2062,2072', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-18', 81);
INSERT INTO `sys_oper_log` VALUES (603, '字典类型', 1, 'com.ruoyi.web.controller.system.SysDictTypeController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"dictName\":\"钱包类型\",\"dictType\":\"wallet_type_dic\",\"params\":{},\"remark\":\"钱包类型\",\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 544);
INSERT INTO `sys_oper_log` VALUES (604, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"USDT\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"1\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 812);
INSERT INTO `sys_oper_log` VALUES (605, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"TRX\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"2\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 777);
INSERT INTO `sys_oper_log` VALUES (606, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"积分\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"3\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 463);
INSERT INTO `sys_oper_log` VALUES (607, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"彩金\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"4\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 1000);
INSERT INTO `sys_oper_log` VALUES (608, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"bonus/giveBonus\",\"createTime\":\"2024-11-18 15:33:28\",\"icon\":\"post\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2072,\"menuName\":\"彩金发放记录\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":2061,\"path\":\"giveBonus\",\"perms\":\"\",', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 465);
INSERT INTO `sys_oper_log` VALUES (609, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"user/activityUser\",\"createBy\":\"admin\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"活动管理\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2008,\"path\":\"activityUser\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 371);
INSERT INTO `sys_oper_log` VALUES (610, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"user/activityUser\",\"createTime\":\"2024-11-19 15:44:50\",\"icon\":\"checkbox\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2074,\"menuName\":\"活动管理\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2008,\"path\":\"activityUser\",\"perms\":', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 317);
INSERT INTO `sys_oper_log` VALUES (611, '菜单管理', 1, 'com.ruoyi.web.controller.system.SysMenuController.add()', 'POST', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"pc28/userbetting/index\",\"createBy\":\"admin\",\"icon\":\"date\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuName\":\"游戏记录\",\"menuType\":\"C\",\"orderNum\":2,\"params\":{},\"parentId\":2022,\"path\":\"userbetting\",\"status\":\"0\",\"visible\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 353);
INSERT INTO `sys_oper_log` VALUES (612, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"pc28/userbetting/index\",\"createTime\":\"2024-11-19 15:51:54\",\"icon\":\"date\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2075,\"menuName\":\"用户游戏记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":2022,\"path\":\"userbetting\",\"p', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 422);
INSERT INTO `sys_oper_log` VALUES (613, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"children\":[],\"component\":\"pc28/defect\",\"createTime\":\"2024-11-18 14:54:52\",\"icon\":\"clipboard\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2069,\"menuName\":\"反水记录\",\"menuType\":\"C\",\"orderNum\":4,\"params\":{},\"parentId\":2022,\"path\":\"defect\",\"perms\":\"\",\"status\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 287);
INSERT INTO `sys_oper_log` VALUES (614, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"转账\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"10\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 503);
INSERT INTO `sys_oper_log` VALUES (615, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"收款\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"11\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 437);
INSERT INTO `sys_oper_log` VALUES (616, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"发红包\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"12\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 489);
INSERT INTO `sys_oper_log` VALUES (617, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"领红包\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"13\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 423);
INSERT INTO `sys_oper_log` VALUES (618, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"转账退款\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"14\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 405);
INSERT INTO `sys_oper_log` VALUES (619, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"红包退款\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"15\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 695);
INSERT INTO `sys_oper_log` VALUES (620, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"首充返利\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"16\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 450);
INSERT INTO `sys_oper_log` VALUES (621, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"开业豪礼\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"17\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-19', 434);
INSERT INTO `sys_oper_log` VALUES (622, '字典类型', 1, 'com.ruoyi.web.controller.system.SysDictTypeController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/type', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"dictName\":\"游戏类型\",\"dictType\":\"game_type\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 538);
INSERT INTO `sys_oper_log` VALUES (623, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"骰子\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"1\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 467);
INSERT INTO `sys_oper_log` VALUES (624, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"PC28\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"2\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 448);
INSERT INTO `sys_oper_log` VALUES (625, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"PC28高倍\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"3\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 543);
INSERT INTO `sys_oper_log` VALUES (626, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"极速骰子\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"7\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 479);
INSERT INTO `sys_oper_log` VALUES (627, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"骰子反水\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"4\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 401);
INSERT INTO `sys_oper_log` VALUES (628, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"PC2.0反水\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"5\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 498);
INSERT INTO `sys_oper_log` VALUES (629, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"PC2.8高倍\",\"dictSort\":0,\"dictType\":\"game_type\",\"dictValue\":\"6\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 427);
INSERT INTO `sys_oper_log` VALUES (630, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '205.198.121.117', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 72);
INSERT INTO `sys_oper_log` VALUES (631, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 649);
INSERT INTO `sys_oper_log` VALUES (632, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 34);
INSERT INTO `sys_oper_log` VALUES (633, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 63);
INSERT INTO `sys_oper_log` VALUES (634, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-11-09 19:29:34\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 52);
INSERT INTO `sys_oper_log` VALUES (635, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2023-09-19 07:37:46\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2050,2038,2067,2046,2068,2047,2048,2074,2030,2053,2032,2049,2054,2061,2073,2070,2071,2063', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 49);
INSERT INTO `sys_oper_log` VALUES (636, '角色管理', 2, 'com.ruoyi.web.controller.system.SysRoleController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/role', '165.154.72.139', 'XX XX', '{\"admin\":false,\"createTime\":\"2024-10-28 12:40:19\",\"dataScope\":\"1\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":false,\"menuIds\":[2008,2009,2074,2030,2053,2032,2054,2061,2073,2070,2071,2063,2062,2072,2033,2022,2023,2024,2075,2069', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 45);
INSERT INTO `sys_oper_log` VALUES (637, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/user', '165.154.72.139', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"admin\",\"createTime\":\"2024-11-09 19:44:07\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0,100\",\"children\":[],\"deptId\":101,\"deptName\":\"管理部门\",\"leader\":\"代清阳1\",\"orderNum\":1,\"params\":{},\"parentId\":100,\"status\":\"0\"},\"d', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 55);
INSERT INTO `sys_oper_log` VALUES (638, '个人信息', 2, 'com.ruoyi.web.controller.system.SysProfileController.updatePwd()', 'PUT', 1, 'xiaogui', '管理部门', '/system/user/profile/updatePwd', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', '{}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 348);
INSERT INTO `sys_oper_log` VALUES (639, '个人信息', 2, 'com.ruoyi.web.controller.system.SysProfileController.updatePwd()', 'PUT', 1, 'xiaogui', '管理部门', '/system/user/profile/updatePwd', '2409:8a70:32:0:5049:e020:21bd:4005', '内网IP', '{}', '{\"msg\":\"修改密码失败，旧密码错误\",\"code\":500}', NULL, NULL, '2024-11-20', 156);
INSERT INTO `sys_oper_log` VALUES (640, '菜单管理', 2, 'com.ruoyi.web.controller.system.SysMenuController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/menu', '165.154.72.139', 'XX XX', '{\"children\":[],\"component\":\"pc28/userbetting/index\",\"createTime\":\"2024-11-19 07:51:54\",\"icon\":\"date\",\"isCache\":\"0\",\"isFrame\":\"1\",\"menuId\":2075,\"menuName\":\"用户游戏记录\",\"menuType\":\"C\",\"orderNum\":3,\"params\":{},\"parentId\":2022,\"path\":\"userbetting\",\"p', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-20', 41);
INSERT INTO `sys_oper_log` VALUES (641, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:19:47\",\"default\":false,\"dictCode\":31,\"dictLabel\":\"充值\",\"dictSort\":1,\"dictType\":\"payment_type\",\"dictValue\":\"1\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 460);
INSERT INTO `sys_oper_log` VALUES (642, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:19:55\",\"default\":false,\"dictCode\":32,\"dictLabel\":\"上注\",\"dictSort\":2,\"dictType\":\"payment_type\",\"dictValue\":\"2\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 427);
INSERT INTO `sys_oper_log` VALUES (643, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:00\",\"default\":false,\"dictCode\":33,\"dictLabel\":\"申请提现\",\"dictSort\":3,\"dictType\":\"payment_type\",\"dictValue\":\"3\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 421);
INSERT INTO `sys_oper_log` VALUES (644, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:09\",\"default\":false,\"dictCode\":34,\"dictLabel\":\"反水\",\"dictSort\":4,\"dictType\":\"payment_type\",\"dictValue\":\"4\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 444);
INSERT INTO `sys_oper_log` VALUES (645, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:17\",\"default\":false,\"dictCode\":35,\"dictLabel\":\"中奖\",\"dictSort\":5,\"dictType\":\"payment_type\",\"dictValue\":\"5\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 413);
INSERT INTO `sys_oper_log` VALUES (646, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:23\",\"default\":false,\"dictCode\":36,\"dictLabel\":\"取消上注\",\"dictSort\":6,\"dictType\":\"payment_type\",\"dictValue\":\"6\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 699);
INSERT INTO `sys_oper_log` VALUES (647, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:30\",\"default\":false,\"dictCode\":37,\"dictLabel\":\"彩金提现\",\"dictSort\":7,\"dictType\":\"payment_type\",\"dictValue\":\"7\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 527);
INSERT INTO `sys_oper_log` VALUES (648, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:38\",\"default\":false,\"dictCode\":38,\"dictLabel\":\"提现打款记录\",\"dictSort\":8,\"dictType\":\"payment_type\",\"dictValue\":\"8\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 492);
INSERT INTO `sys_oper_log` VALUES (649, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-11 22:20:44\",\"default\":false,\"dictCode\":39,\"dictLabel\":\"彩金打款记录\",\"dictSort\":9,\"dictType\":\"payment_type\",\"dictValue\":\"9\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 407);
INSERT INTO `sys_oper_log` VALUES (650, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:57:49\",\"default\":false,\"dictCode\":46,\"dictLabel\":\"转账\",\"dictSort\":10,\"dictType\":\"payment_type\",\"dictValue\":\"10\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 439);
INSERT INTO `sys_oper_log` VALUES (651, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:57:59\",\"default\":false,\"dictCode\":47,\"dictLabel\":\"收款\",\"dictSort\":11,\"dictType\":\"payment_type\",\"dictValue\":\"11\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 438);
INSERT INTO `sys_oper_log` VALUES (652, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:11\",\"default\":false,\"dictCode\":48,\"dictLabel\":\"发红包\",\"dictSort\":12,\"dictType\":\"payment_type\",\"dictValue\":\"12\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 522);
INSERT INTO `sys_oper_log` VALUES (653, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:20\",\"default\":false,\"dictCode\":49,\"dictLabel\":\"领红包\",\"dictSort\":13,\"dictType\":\"payment_type\",\"dictValue\":\"13\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 439);
INSERT INTO `sys_oper_log` VALUES (654, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:30\",\"default\":false,\"dictCode\":50,\"dictLabel\":\"转账退款\",\"dictSort\":14,\"dictType\":\"payment_type\",\"dictValue\":\"14\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 436);
INSERT INTO `sys_oper_log` VALUES (655, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:39\",\"default\":false,\"dictCode\":51,\"dictLabel\":\"红包退款\",\"dictSort\":15,\"dictType\":\"payment_type\",\"dictValue\":\"15\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 399);
INSERT INTO `sys_oper_log` VALUES (656, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:50\",\"cssClass\":\"16\",\"default\":false,\"dictCode\":52,\"dictLabel\":\"首充返利\",\"dictSort\":0,\"dictType\":\"payment_type\",\"dictValue\":\"16\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"update', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 447);
INSERT INTO `sys_oper_log` VALUES (657, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:58:50\",\"cssClass\":\"\",\"default\":false,\"dictCode\":52,\"dictLabel\":\"首充返利\",\"dictSort\":16,\"dictType\":\"payment_type\",\"dictValue\":\"16\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateB', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 443);
INSERT INTO `sys_oper_log` VALUES (658, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 22:59:04\",\"default\":false,\"dictCode\":53,\"dictLabel\":\"开业豪礼\",\"dictSort\":17,\"dictType\":\"payment_type\",\"dictValue\":\"17\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 476);
INSERT INTO `sys_oper_log` VALUES (659, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"救援斤\",\"dictSort\":18,\"dictType\":\"payment_type\",\"dictValue\":\"18\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 422);
INSERT INTO `sys_oper_log` VALUES (660, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-21 00:49:07\",\"default\":false,\"dictCode\":61,\"dictLabel\":\"救援金\",\"dictSort\":18,\"dictType\":\"payment_type\",\"dictValue\":\"18\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-21', 575);
INSERT INTO `sys_oper_log` VALUES (661, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"邀请返利\",\"dictSort\":101,\"dictType\":\"payment_type\",\"dictValue\":\"101\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 500);
INSERT INTO `sys_oper_log` VALUES (662, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 00:34:07\",\"default\":false,\"dictCode\":45,\"dictLabel\":\"彩U\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"4\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 431);
INSERT INTO `sys_oper_log` VALUES (663, '字典数据', 1, 'com.ruoyi.web.controller.system.SysDictDataController.add()', 'POST', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"default\":false,\"dictLabel\":\"彩T\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"5\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 410);
INSERT INTO `sys_oper_log` VALUES (664, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 00:33:51\",\"default\":false,\"dictCode\":43,\"dictLabel\":\"TRX\",\"dictSort\":1,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"2\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 471);
INSERT INTO `sys_oper_log` VALUES (665, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 00:33:59\",\"cssClass\":\"2\",\"default\":false,\"dictCode\":44,\"dictLabel\":\"积分\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"3\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 425);
INSERT INTO `sys_oper_log` VALUES (666, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 00:33:59\",\"cssClass\":\"\",\"default\":false,\"dictCode\":44,\"dictLabel\":\"积分\",\"dictSort\":2,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"3\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"a', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 401);
INSERT INTO `sys_oper_log` VALUES (667, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-19 00:34:07\",\"default\":false,\"dictCode\":45,\"dictLabel\":\"彩U\",\"dictSort\":3,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"4\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"admin\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 410);
INSERT INTO `sys_oper_log` VALUES (668, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-22 03:47:06\",\"cssClass\":\"4\",\"default\":false,\"dictCode\":63,\"dictLabel\":\"彩T\",\"dictSort\":0,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"5\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"ad', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 408);
INSERT INTO `sys_oper_log` VALUES (669, '字典数据', 2, 'com.ruoyi.web.controller.system.SysDictDataController.edit()', 'PUT', 1, 'admin', '研发部门', '/system/dict/data', '127.0.0.1', '内网IP', '{\"createBy\":\"admin\",\"createTime\":\"2024-11-22 03:47:06\",\"cssClass\":\"\",\"default\":false,\"dictCode\":63,\"dictLabel\":\"彩T\",\"dictSort\":4,\"dictType\":\"wallet_type_dic\",\"dictValue\":\"5\",\"isDefault\":\"N\",\"listClass\":\"default\",\"params\":{},\"status\":\"0\",\"updateBy\":\"adm', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-22', 417);
INSERT INTO `sys_oper_log` VALUES (670, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'daqian', 'VIP', '/system/user', '109.61.18.153', 'XX XX', '{\"admin\":false,\"createBy\":\"daqian\",\"deptId\":100,\"nickName\":\"adminn\",\"params\":{},\"postIds\":[1],\"roleIds\":[103],\"sex\":\"0\",\"status\":\"0\",\"userId\":119,\"userName\":\"adminn\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-24', 199);
INSERT INTO `sys_oper_log` VALUES (671, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'daqian', 'VIP', '/system/user', '109.61.18.153', 'XX XX', '{\"admin\":false,\"deptId\":100,\"nickName\":\"adminn\",\"params\":{},\"postIds\":[1],\"roleIds\":[103],\"sex\":\"0\",\"status\":\"0\",\"userName\":\"adminn\"}', '{\"msg\":\"新增用户\'adminn\'失败，登录账号已存在\",\"code\":500}', NULL, NULL, '2024-11-24', 7);
INSERT INTO `sys_oper_log` VALUES (672, '用户管理', 2, 'com.ruoyi.web.controller.system.SysUserController.edit()', 'PUT', 1, 'daqian', 'VIP', '/system/user', '109.61.18.153', 'XX XX', '{\"admin\":false,\"avatar\":\"\",\"createBy\":\"daqian\",\"createTime\":\"2024-11-23 19:02:05\",\"delFlag\":\"0\",\"dept\":{\"ancestors\":\"0\",\"children\":[],\"deptId\":100,\"deptName\":\"VIP\",\"leader\":\"代清阳\",\"orderNum\":0,\"params\":{},\"parentId\":0,\"status\":\"0\"},\"deptId\":100,\"ema', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-11-24', 43);
INSERT INTO `sys_oper_log` VALUES (673, '用户管理', 1, 'com.ruoyi.web.controller.system.SysUserController.add()', 'POST', 1, 'admin', '研发部门', '/system/user', '101.44.82.217', 'XX XX', '{\"admin\":false,\"createBy\":\"admin\",\"deptId\":100,\"email\":\"1231\",\"nickName\":\"45613\",\"params\":{},\"phonenumber\":\"451232\",\"postIds\":[2],\"remark\":\"测试\",\"roleIds\":[103],\"sex\":\"1\",\"status\":\"0\",\"userId\":120,\"userName\":\"tesr\"}', '{\"msg\":\"操作成功\",\"code\":200}', NULL, NULL, '2024-12-05', 172);

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `post_id` bigint(20) NULL DEFAULT NULL,
  `post_code` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_sort` int(11) NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES (1, 'ceo', '董事长', 1, '0', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_post` VALUES (2, 'se', '项目经理', 2, '0', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_post` VALUES (3, 'hr', '人力资源', 3, '0', 'admin', '2023-03-27', NULL, NULL, NULL);
INSERT INTO `sys_post` VALUES (4, 'user', '普通员工', 4, '0', 'admin', '2023-03-27', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` bigint(20) NULL DEFAULT NULL,
  `role_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_key` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_sort` int(11) NULL DEFAULT NULL,
  `data_scope` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `menu_check_` int(11) NULL DEFAULT NULL,
  `dept_check_` int(11) NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `del_flag` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', 1, '1', 1, 1, '0', '0', 'admin', '2023-03-27', NULL, NULL, '超级管理员');
INSERT INTO `sys_role` VALUES (2, '代理商角色', 'common', 2, '2', NULL, NULL, '1', '2', 'admin', '2023-03-27', 'admin', '2023-09-07', '代理商');
INSERT INTO `sys_role` VALUES (100, '管理员', 'conservator', 3, '1', NULL, NULL, '1', '2', 'admin', '2023-03-29', 'admin', '2023-09-07', NULL);
INSERT INTO `sys_role` VALUES (101, 'vip', 'system', 1, '1', NULL, 1, '0', '0', 'admin', '2023-09-19', 'admin', '2024-11-20', NULL);
INSERT INTO `sys_role` VALUES (102, '财务', 'finance', 2, '1', NULL, 1, '0', '0', 'admin', '2024-10-28', 'admin', '2024-11-10', NULL);
INSERT INTO `sys_role` VALUES (103, '股东观察者', 'observer', NULL, '1', NULL, 1, '0', '0', 'admin', '2024-10-28', 'admin', '2024-11-20', NULL);
INSERT INTO `sys_role` VALUES (104, '客服', 'kefu', 6, '1', NULL, 1, '0', '0', 'admin', '2024-11-10', 'admin', '2024-11-20', NULL);

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `role_id` bigint(20) NULL DEFAULT NULL,
  `dept_id` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` bigint(20) NULL DEFAULT NULL,
  `menu_id` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (101, 1);
INSERT INTO `sys_role_menu` VALUES (101, 100);
INSERT INTO `sys_role_menu` VALUES (101, 108);
INSERT INTO `sys_role_menu` VALUES (101, 500);
INSERT INTO `sys_role_menu` VALUES (101, 501);
INSERT INTO `sys_role_menu` VALUES (101, 1000);
INSERT INTO `sys_role_menu` VALUES (101, 1001);
INSERT INTO `sys_role_menu` VALUES (101, 1002);
INSERT INTO `sys_role_menu` VALUES (101, 1003);
INSERT INTO `sys_role_menu` VALUES (101, 1004);
INSERT INTO `sys_role_menu` VALUES (101, 1005);
INSERT INTO `sys_role_menu` VALUES (101, 1006);
INSERT INTO `sys_role_menu` VALUES (101, 1039);
INSERT INTO `sys_role_menu` VALUES (101, 1041);
INSERT INTO `sys_role_menu` VALUES (101, 1042);
INSERT INTO `sys_role_menu` VALUES (101, 1044);
INSERT INTO `sys_role_menu` VALUES (101, 2008);
INSERT INTO `sys_role_menu` VALUES (101, 2009);
INSERT INTO `sys_role_menu` VALUES (101, 2022);
INSERT INTO `sys_role_menu` VALUES (101, 2023);
INSERT INTO `sys_role_menu` VALUES (101, 2024);
INSERT INTO `sys_role_menu` VALUES (101, 2026);
INSERT INTO `sys_role_menu` VALUES (101, 2027);
INSERT INTO `sys_role_menu` VALUES (101, 2028);
INSERT INTO `sys_role_menu` VALUES (101, 2029);
INSERT INTO `sys_role_menu` VALUES (101, 2030);
INSERT INTO `sys_role_menu` VALUES (101, 2032);
INSERT INTO `sys_role_menu` VALUES (101, 2033);
INSERT INTO `sys_role_menu` VALUES (101, 2038);
INSERT INTO `sys_role_menu` VALUES (101, 2039);
INSERT INTO `sys_role_menu` VALUES (101, 2046);
INSERT INTO `sys_role_menu` VALUES (101, 2047);
INSERT INTO `sys_role_menu` VALUES (101, 2048);
INSERT INTO `sys_role_menu` VALUES (101, 2049);
INSERT INTO `sys_role_menu` VALUES (101, 2050);
INSERT INTO `sys_role_menu` VALUES (101, 2053);
INSERT INTO `sys_role_menu` VALUES (101, 2054);
INSERT INTO `sys_role_menu` VALUES (101, 2061);
INSERT INTO `sys_role_menu` VALUES (101, 2062);
INSERT INTO `sys_role_menu` VALUES (101, 2063);
INSERT INTO `sys_role_menu` VALUES (101, 2067);
INSERT INTO `sys_role_menu` VALUES (101, 2068);
INSERT INTO `sys_role_menu` VALUES (101, 2069);
INSERT INTO `sys_role_menu` VALUES (101, 2070);
INSERT INTO `sys_role_menu` VALUES (101, 2071);
INSERT INTO `sys_role_menu` VALUES (101, 2072);
INSERT INTO `sys_role_menu` VALUES (101, 2073);
INSERT INTO `sys_role_menu` VALUES (101, 2074);
INSERT INTO `sys_role_menu` VALUES (101, 2075);
INSERT INTO `sys_role_menu` VALUES (102, 1);
INSERT INTO `sys_role_menu` VALUES (102, 108);
INSERT INTO `sys_role_menu` VALUES (102, 500);
INSERT INTO `sys_role_menu` VALUES (102, 1039);
INSERT INTO `sys_role_menu` VALUES (102, 1041);
INSERT INTO `sys_role_menu` VALUES (102, 2008);
INSERT INTO `sys_role_menu` VALUES (102, 2009);
INSERT INTO `sys_role_menu` VALUES (102, 2022);
INSERT INTO `sys_role_menu` VALUES (102, 2023);
INSERT INTO `sys_role_menu` VALUES (102, 2024);
INSERT INTO `sys_role_menu` VALUES (102, 2026);
INSERT INTO `sys_role_menu` VALUES (102, 2027);
INSERT INTO `sys_role_menu` VALUES (102, 2028);
INSERT INTO `sys_role_menu` VALUES (102, 2029);
INSERT INTO `sys_role_menu` VALUES (102, 2030);
INSERT INTO `sys_role_menu` VALUES (102, 2032);
INSERT INTO `sys_role_menu` VALUES (102, 2033);
INSERT INTO `sys_role_menu` VALUES (102, 2038);
INSERT INTO `sys_role_menu` VALUES (102, 2039);
INSERT INTO `sys_role_menu` VALUES (102, 2046);
INSERT INTO `sys_role_menu` VALUES (102, 2047);
INSERT INTO `sys_role_menu` VALUES (102, 2048);
INSERT INTO `sys_role_menu` VALUES (102, 2049);
INSERT INTO `sys_role_menu` VALUES (103, 1);
INSERT INTO `sys_role_menu` VALUES (103, 108);
INSERT INTO `sys_role_menu` VALUES (103, 500);
INSERT INTO `sys_role_menu` VALUES (103, 1039);
INSERT INTO `sys_role_menu` VALUES (103, 1041);
INSERT INTO `sys_role_menu` VALUES (103, 2008);
INSERT INTO `sys_role_menu` VALUES (103, 2009);
INSERT INTO `sys_role_menu` VALUES (103, 2022);
INSERT INTO `sys_role_menu` VALUES (103, 2023);
INSERT INTO `sys_role_menu` VALUES (103, 2024);
INSERT INTO `sys_role_menu` VALUES (103, 2026);
INSERT INTO `sys_role_menu` VALUES (103, 2027);
INSERT INTO `sys_role_menu` VALUES (103, 2028);
INSERT INTO `sys_role_menu` VALUES (103, 2029);
INSERT INTO `sys_role_menu` VALUES (103, 2030);
INSERT INTO `sys_role_menu` VALUES (103, 2032);
INSERT INTO `sys_role_menu` VALUES (103, 2033);
INSERT INTO `sys_role_menu` VALUES (103, 2053);
INSERT INTO `sys_role_menu` VALUES (103, 2054);
INSERT INTO `sys_role_menu` VALUES (103, 2061);
INSERT INTO `sys_role_menu` VALUES (103, 2062);
INSERT INTO `sys_role_menu` VALUES (103, 2063);
INSERT INTO `sys_role_menu` VALUES (103, 2069);
INSERT INTO `sys_role_menu` VALUES (103, 2070);
INSERT INTO `sys_role_menu` VALUES (103, 2071);
INSERT INTO `sys_role_menu` VALUES (103, 2072);
INSERT INTO `sys_role_menu` VALUES (103, 2073);
INSERT INTO `sys_role_menu` VALUES (103, 2074);
INSERT INTO `sys_role_menu` VALUES (103, 2075);
INSERT INTO `sys_role_menu` VALUES (104, 1);
INSERT INTO `sys_role_menu` VALUES (104, 100);
INSERT INTO `sys_role_menu` VALUES (104, 1000);
INSERT INTO `sys_role_menu` VALUES (104, 2008);
INSERT INTO `sys_role_menu` VALUES (104, 2009);
INSERT INTO `sys_role_menu` VALUES (104, 2022);
INSERT INTO `sys_role_menu` VALUES (104, 2023);
INSERT INTO `sys_role_menu` VALUES (104, 2024);
INSERT INTO `sys_role_menu` VALUES (104, 2026);
INSERT INTO `sys_role_menu` VALUES (104, 2027);
INSERT INTO `sys_role_menu` VALUES (104, 2028);
INSERT INTO `sys_role_menu` VALUES (104, 2029);
INSERT INTO `sys_role_menu` VALUES (104, 2030);
INSERT INTO `sys_role_menu` VALUES (104, 2032);
INSERT INTO `sys_role_menu` VALUES (104, 2033);
INSERT INTO `sys_role_menu` VALUES (104, 2038);
INSERT INTO `sys_role_menu` VALUES (104, 2039);
INSERT INTO `sys_role_menu` VALUES (104, 2046);
INSERT INTO `sys_role_menu` VALUES (104, 2047);
INSERT INTO `sys_role_menu` VALUES (104, 2048);
INSERT INTO `sys_role_menu` VALUES (104, 2049);
INSERT INTO `sys_role_menu` VALUES (104, 2050);
INSERT INTO `sys_role_menu` VALUES (104, 2053);
INSERT INTO `sys_role_menu` VALUES (104, 2054);
INSERT INTO `sys_role_menu` VALUES (104, 2061);
INSERT INTO `sys_role_menu` VALUES (104, 2062);
INSERT INTO `sys_role_menu` VALUES (104, 2063);
INSERT INTO `sys_role_menu` VALUES (104, 2067);
INSERT INTO `sys_role_menu` VALUES (104, 2068);
INSERT INTO `sys_role_menu` VALUES (104, 2069);
INSERT INTO `sys_role_menu` VALUES (104, 2070);
INSERT INTO `sys_role_menu` VALUES (104, 2071);
INSERT INTO `sys_role_menu` VALUES (104, 2072);
INSERT INTO `sys_role_menu` VALUES (104, 2073);
INSERT INTO `sys_role_menu` VALUES (104, 2074);
INSERT INTO `sys_role_menu` VALUES (104, 2075);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint(20) NULL DEFAULT NULL,
  `dept_id` bigint(20) NULL DEFAULT NULL,
  `user_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nick_name` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_type` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `del_flag` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_ip` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_date` date NULL DEFAULT NULL,
  `create_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` date NULL DEFAULT NULL,
  `update_by` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` date NULL DEFAULT NULL,
  `remark` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `shakng_user` bigint(20) NULL DEFAULT NULL,
  `community_i` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 103, 'admin', '社区1', '00', '309711990161409', '293400291966971', '1', NULL, '$2a$10$RSPncX6VL1cE1Mw8MiUQRetgePbKJNfyn/OZoANcadDAr1F0LBC5y', '0', '0', '127.0.0.1', '2024-12-06', 'admin', '2023-03-27', NULL, '2024-12-06', '管理员', 309711990161409, 293400291966971);
INSERT INTO `sys_user` VALUES (2, 202, 'ry', '若依', '00', '309711990161409', '293400291966971', '1', NULL, '$2a$10$9JbzurM8/xBYqIUGCDXNke5Q4xvqUONsMXKIFfyP0PRIcpKi16tuC', '0', '2', '127.0.0.1', '2023-03-29', 'admin', '2023-03-27', 'admin', '2023-03-29', '测试员', 0, 0);
INSERT INTO `sys_user` VALUES (104, 201, '16687631643', '16687631643', '00', NULL, NULL, '0', NULL, '$2a$10$CSB8hI4gwuaTyRMI/qcGjOPWNN2hmpqrUjhSR.7smWV66dz5PmI9q', '0', '2', '127.0.0.1', '2023-05-19', 'admin', '2023-04-08', NULL, '2023-05-19', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (105, 0, 'aaa', '对对对', '00', NULL, NULL, '0', NULL, '$2a$10$U.nVfndQCQUAgzOqekHpbeC5Qv024oqxkRyZp4sEnrjrhNBM4WhnW', '0', '2', NULL, NULL, 'wangtao', '2023-06-15', NULL, NULL, NULL, 0, 0);
INSERT INTO `sys_user` VALUES (106, 103, 'vip001', 'VIP001', '00', NULL, '15333330000', '2', NULL, '$2a$10$414JTgj4Nyf5jlNv0xJpSuKls6mZeDXyCcHvOXrFFs0wX/MKNCw5y', '0', '2', '127.0.0.1', '2023-09-19', 'admin', '2023-09-19', 'admin', '2023-09-19', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (108, 100, 'daqian', 'daqian', '00', '123', '123', '0', NULL, '$2a$10$jIpAsyzq.zVBhWpb4kQFQusWLmY3erstfFWA5atUm8wDzNL/YAU.q', '0', '0', '2409:8a70:31:f7b0:88b9:5fdc:69e5:55a3', '2024-12-06', 'admin', '2024-10-28', NULL, '2024-12-06', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (109, 100, 'noone', '4654313', '00', '56456132', '133584', '0', NULL, '$2a$10$by4.ZqLT9xx.vZf8s2f6NOtljD8x3oLmzjYwbQiNQJRnaYtFYuBeq', '0', '0', '127.0.0.1', '2024-11-18', 'admin', '2024-10-28', NULL, '2024-11-18', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (110, 100, 'test', 'daqwe', '00', '12321343', '12312354343', '0', NULL, '$2a$10$oDA9hqgFIpL8oXFE.eCJneDPkaa4IzBE09udeDHN48cEilV8VD/O2', '0', '2', '127.0.0.1', '2024-10-28', 'admin', '2024-10-28', 'admin', '2024-10-28', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (111, 100, 'niujs', '7110', '00', '7110', '7110', '1', NULL, '$2a$10$EOy4WnwsSXqUkEUiBonTxu4BMoJGDjN0EGtHmwZbUNBZTkLyB.WEy', '0', '0', '127.0.0.1', '2024-11-18', 'admin', '2024-10-28', 'admin', '2024-11-18', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (112, 100, 'hoshimi', '8110', '00', '8110', '8110', '0', NULL, '$2a$10$J.xxqbSrJdagWuc32lZVWugJrWE2nExRQ5Mgij43hlwyqJ1J5QOX6', '0', '0', '127.0.0.1', '2024-11-19', 'admin', '2024-10-28', NULL, '2024-11-19', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (113, 100, 'lantian', '7321', '00', '7321', '7321', '1', NULL, '$2a$10$mgcEmWFeKGxnqw3VuVyOfOqNNOXG/oJ1f1mciRztbg/P.M4pSx9CK', '0', '0', '127.0.0.1', '2024-12-01', 'admin', '2024-10-28', NULL, '2024-12-01', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (114, 100, 'nanfeng', '7654', '00', '7654', '7654', '1', NULL, '$2a$10$z2jTcHEfAKcNsexPIWiFpOJGwwulec.R9UucLWQIG6TeXs1d/D8ke', '0', '0', '8.212.13.108', '2024-12-06', 'admin', '2024-10-28', NULL, '2024-12-06', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (115, 100, 'rona', '8652', '00', '8652', '8652', '0', NULL, '$2a$10$YU3ASGSEQv9jItRvJtMZFuTyj0UG75hNMjcIDq1NGYUR3ZcE1odhC', '0', '0', '127.0.0.1', '2024-10-28', 'admin', '2024-10-28', NULL, '2024-10-28', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (116, 100, 'lhc', '令狐冲', '00', '000', '0000', '2', NULL, '$2a$10$oNf84zmlvMxX5BfmOJM58OUGZclI.jhs672xS5yxyTZ./EejFcIee', '0', '0', '127.0.0.1', '2024-11-24', 'daqian', '2024-10-29', 'admin', '2024-11-24', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (117, 101, 'xiaogui', '小鬼', '00', '1031', '1031', '0', NULL, '$2a$10$JbSEp7ROmoqeKBSjzm6nB.8J5NFW2kwvKon1GZ2Tuc0gXvLgcMN1K', '0', '2', NULL, NULL, 'daqian', '2024-11-10', 'admin', '2024-11-10', '客服经理', 0, 0);
INSERT INTO `sys_user` VALUES (118, 101, 'xiaogui', 'xiaogui', '00', '7063', '694411', '1', NULL, '$2a$10$08FB36p0jfEjG69cEwg31e/PVcPvnD8mVOiwe.QMKY/R.yTc1HeVO', '0', '0', '2409:8a70:31:f7b0:a99f:ab85:f616:a7d3', '2024-12-06', 'admin', '2024-11-10', 'admin', '2024-12-06', NULL, 0, 0);
INSERT INTO `sys_user` VALUES (119, 100, 'adminn', 'adminn', '00', NULL, NULL, '0', NULL, '$2a$10$gqboYPNtr3mky7rKCtC94elEEQq4HMYg7ZN4rfxK0bccm2qNcl7nS', '0', '0', '127.0.0.1', '2024-11-24', 'daqian', '2024-11-24', 'daqian', '2024-11-24', NULL, 0, 0);

-- ----------------------------
-- Table structure for sys_user_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_post`;
CREATE TABLE `sys_user_post`  (
  `user_id` bigint(20) NULL DEFAULT NULL,
  `post_id` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_post
-- ----------------------------
INSERT INTO `sys_user_post` VALUES (1, 1);
INSERT INTO `sys_user_post` VALUES (109, 2);
INSERT INTO `sys_user_post` VALUES (111, 3);
INSERT INTO `sys_user_post` VALUES (112, 3);
INSERT INTO `sys_user_post` VALUES (113, 2);
INSERT INTO `sys_user_post` VALUES (114, 2);
INSERT INTO `sys_user_post` VALUES (115, 2);
INSERT INTO `sys_user_post` VALUES (116, 3);
INSERT INTO `sys_user_post` VALUES (118, 4);
INSERT INTO `sys_user_post` VALUES (119, 1);
INSERT INTO `sys_user_post` VALUES (120, 2);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` bigint(20) NULL DEFAULT NULL,
  `role_id` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (108, 101);
INSERT INTO `sys_user_role` VALUES (109, 101);
INSERT INTO `sys_user_role` VALUES (111, 102);
INSERT INTO `sys_user_role` VALUES (112, 103);
INSERT INTO `sys_user_role` VALUES (113, 103);
INSERT INTO `sys_user_role` VALUES (114, 103);
INSERT INTO `sys_user_role` VALUES (115, 103);
INSERT INTO `sys_user_role` VALUES (116, 103);
INSERT INTO `sys_user_role` VALUES (118, 104);
INSERT INTO `sys_user_role` VALUES (119, 102);
INSERT INTO `sys_user_role` VALUES (119, 103);
INSERT INTO `sys_user_role` VALUES (120, 103);

SET FOREIGN_KEY_CHECKS = 1;
