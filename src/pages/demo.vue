<template>
  <!--  行列拖拽案例 -->
  <div style="padding: 20px">
    <el-table
      row-key="id"
      :key="tableKey"
      highlight-current-row 
      :data="tableData"
    >
      <el-table-column type="selection" width="60" align="center">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeaerList"
        :key="index"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
      >
        <template v-slot="scoped">
          <span v-if="item.prop === 'custom'">自定义列内容</span>
          <span v-else>{{ scoped.row[scoped.column.property] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  name: "index",
  data() {
    return {
      tableKey: "", //拖拽排序后，将mykey赋随机值，使表格重绘（重绘后需重新挂载拖拽监听事件）
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄",
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄",
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄",
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄",
        },
      ],
      // 动态表头
      tableHeaerList: [
        {
          label: "id",
          prop: "id",
          width: 60,
        },
        {
          label: "日期",
          prop: "date",
          width: 120,
        },
        {
          label: "姓名",
          prop: "name",
          width: 120,
        },
        {
          label: "地址",
          prop: "address",
          width: 300,
        },
        {
          label: "自定义",
          prop: "custom",
          width: 200,
        },
      ],
    };
  },
  mounted() {
    this.rowDrop();
    this.columnDrop();
  },
  methods: {
    /**
     * 行拖拽
     */
    rowDrop() {
      // 要侦听拖拽响应的DOM对象
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        // 结束拖拽后的回调函数
        onEnd({ newIndex, oldIndex }) {
          console.log("拖动了行，当前序号：" + newIndex);
          const currentRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currentRow);
          _this.reDrawTable();
        },
      });
    },
    /**
     * 列拖拽
     */
    columnDrop() {
      const _this = this;
      const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          // 跳过显示的列数量，如开头我们用了一个多选框
          const empty = 1;
          const oldItem = _this.tableHeaerList[evt.oldIndex - empty];
          this.newCol = evt.newIndex - 1;
          _this.tableHeaerList.splice(evt.oldIndex - empty, 1);
          _this.tableHeaerList.splice(evt.newIndex - empty, 0, oldItem);
          _this.reDrawTable();
        },
      });
    },
    //触发表格重绘
    reDrawTable() {
      this.tableKey = Math.random();
      this.$nextTick(() => {
        this.rowDrop();
        this.columnDrop();
      });
    },
  },
};
</script>
